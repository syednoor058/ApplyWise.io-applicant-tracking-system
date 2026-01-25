import { Link } from "react-router";

const baseUrl = import.meta.env.VITE_BASE_URL;
const footerLinks = {
  quickLinks: [
    { name: "Home", href: baseUrl },
    { name: "Features", href: `${baseUrl}#features` },
    { name: "How It Works", href: `${baseUrl}#how-it-works` },
    { name: "FAQ", href: `${baseUrl}#faq` },
    { name: "Developer", href: "https://syednoor.vercel.app" },
  ],
};

const NavLinks = ({linkName, url}: {linkName: string, url: string}) => {
  return (
    <div className='group relative overflow-hidden font-medium'>
      <Link to={url}>{linkName}</Link>
      <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#4F7BFF] to-[#22D3EE] group-hover:w-full transition-all duration-300 ease-in-out'></div>
    </div>
  )
}


export const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 rounded-t-2xl z-20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          {/* Brand */}
          <div className="">
            <Link to='/' className='text-xl md:text-2xl font-bold text-gradient'>ApplyWise.io</Link>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Helps job seekers understand how their resumes perform in real-world ATS screening. By analyzing resumes against specific job descriptions, it provides clear insights and actionable feedback to help candidates apply with confidence and clarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-x-6 space-y-2 flex flex-wrap">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLinks linkName={link.name} url={link.href} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#334155]/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ApplyWise.io | All rights reserved.
          </p>
          <p className="text-sm">
            Developed by <a href="https://syednoor.vercel.app/" target="_blank" className="underline underline-offset-2 hover:text-[#4F7BFF] transition-colors duration-500 ease-in-out">Syed Shaeduzzaman Noor</a>
          </p>
        </div>
      </div>
      <div className="absolute z-40 -top-8 lg:-top-14 right-4 md:right-14 lg:right-20 blur-[3px]">
        <img src="/images/bg-elem-2.png" alt="Footer Background Element" className="h-28 md:h-40 lg:h-50 w-auto" />
      </div>
    </footer>
  );
};
