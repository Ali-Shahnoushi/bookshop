import React, { useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

export default function Discounts() {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-slate-700">لیست تخفیف‌ها</h2>
    </div>
  )
}
