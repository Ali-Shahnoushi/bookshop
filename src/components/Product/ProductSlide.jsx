import React from 'react'
import { RiShoppingBasket2Fill } from 'react-icons/ri'

export default function Product({ name, writer, cover, onAdd, price }) {
  return (
    <div className="relative w-full p-6 sm:p-8 md:p-0">
      <img className="w-full rounded-lg " src={cover} />
      <RiShoppingBasket2Fill
        onClick={() => {
          onAdd(name)
        }}
        className="text-2xl absolute bottom-0 left-0 text-cyan-500 cursor-pointer"
      />
      <h2 className="text-md my-1 text-gray-800 text-right">{name}</h2>
      <p className="text-gray-600 mb-1 text-[13px] text-right">{writer}</p>
      <p className="book-price text-gray-500 text-[14px] text-right direction-rtl">
        {price} تومان
      </p>
    </div>
  )
}
