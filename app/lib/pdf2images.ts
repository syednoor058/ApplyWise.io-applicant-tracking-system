export interface PdfPageImage {
  imageUrl: string;
  file: File;
}

export interface PdfConversionResult {
  pages: PdfPageImage[];
  error?: string;
}


let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
    // Set the worker source to use local file
    lib.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@5.4.530/build/pdf.worker.min.mjs";
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}


export async function convertPdfToImages(
  file: File
): Promise<PdfConversionResult> {
  try {
    const lib = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

    const pages: PdfPageImage[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 4 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      await page.render({ canvasContext: ctx, viewport }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject("Blob failed")),
          "image/png",
          1
        );
      });

      const base = file.name.replace(/\.pdf$/i, "");
      const imageFile = new File(
        [blob],
        `${base}-page-${i}.png`,
        { type: "image/png" }
      );

      pages.push({
        imageUrl: URL.createObjectURL(blob),
        file: imageFile,
      });
    }

    return { pages };
  } catch (err) {
    return { pages: [], error: String(err) };
  }
}
