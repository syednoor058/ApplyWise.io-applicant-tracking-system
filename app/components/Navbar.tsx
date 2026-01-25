import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { usePuterStore } from '~/lib/puter'

const NavLinks = ({linkName, url}: {linkName: string, url: string}) => {
  return (
    <div className='group relative overflow-hidden font-medium'>
      <Link to={url}>{linkName}</Link>
      <div className='absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-[#4F7BFF] to-[#22D3EE] group-hover:w-full transition-all duration-300 ease-in-out'></div>
    </div>
  )
}

const Navbar = () => {
  const [primaryButtonText, setPrimaryButtonText] = useState('Get Started');
  const {auth} = usePuterStore();
  const baseUrl = import.meta.env.VITE_BASE_URL;


  useEffect(() => {
    if(auth.isAuthenticated) {
      setPrimaryButtonText('Upload Resume');
    }
  }, [auth.isAuthenticated]);

  return (
    <nav className='navbar pl-4'>
        <Link to='/' className='text-xl md:text-2xl font-bold text-gradient'>ApplyWise.io</Link>
        <div className='hidden lg:flex flex-row gap-8'>
          <NavLinks linkName='Home' url={baseUrl} />
          <NavLinks linkName='Features' url={`${baseUrl}#features`} />
          <NavLinks linkName='How It Works' url={`${baseUrl}#how-it-works`} />
          <NavLinks linkName='FAQ' url={`${baseUrl}#faq`} />
          <NavLinks linkName='Developer' url='https://syednoor.vercel.app' />
        </div>
        <Link to='/upload' className='primary-button w-fit'>{primaryButtonText}</Link>
    </nav>
  )
}

export default Navbar