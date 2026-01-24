import React from 'react'

const SectionTag = ({icon, text}: {icon: React.ReactNode, text: string}) => {
  return (
    <p className="py-1.5 px-4 rounded-xl border-2 border-green-300 bg-green-100 flex gap-2 items-center text-sm md:text-base">
              <span>
                {icon}
              </span>
              {text}
            </p>
  )
}

export default SectionTag