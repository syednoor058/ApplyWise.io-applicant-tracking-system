import React from 'react'

const Feature = ({icon, title, description} : {icon?: React.ReactNode, title: string, description: string}) => {
  return (
    <div className="flex flex-col items-center md:items-start bg-white shadow-lg rounded-xl p-4">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-center md:text-start">{description}</p>
    </div>
  )
}

export default Feature