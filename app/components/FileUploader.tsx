import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'
import { AddIcon } from './Icons';

interface FileUploaderProps {
    file: File | null;
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ file, onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0] || null;
        onFileSelect?.(selectedFile);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect?.(null);
  };



    return (
        <div className={`w-full ${file ? "" : "border border-dashed py-10 px-4 rounded-2xl"}`}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-7" />
                            <div className="flex items-center space-x-3">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 truncate max-w-[25ch] md:max-w-[35ch] xl:max-w-[60ch]">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer" onClick={handleRemove}>
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
                            </button>
                        </div>
                    ): (
                        <>
                            <div className="mx-auto flex items-center justify-center mb-2">
                                <AddIcon />
                            </div>
                            <p className="text-base text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader
