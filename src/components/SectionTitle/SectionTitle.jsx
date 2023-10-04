import React from 'react'
import { Link } from 'react-router-dom'
import { BsChevronLeft } from 'react-icons/bs'

export default function SectionTitle({ title, description, link }) {
  return (
    <div className="w-[90%] xl:w-[1260px] m-auto p-4 mt-10 flex flex-row-reverse justify-between">
      <div className="flex flex-col">
        <h2 className="section-title text-md text-right font-medium text-gray-800">
          {title}
        </h2>
        <span className="mt-2 text-right text-sm text-gray-600">
          {description}
        </span>
      </div>
      {link && (
        <button className="text-teal-600 text-md flex-row-reverse items-center gap-3 flex">
          <Link to={link}>مشاهده همه</Link>
          <BsChevronLeft />
        </button>
      )}
    </div>
  )
}
