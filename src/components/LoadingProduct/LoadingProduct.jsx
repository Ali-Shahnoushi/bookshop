import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function LoadingProduct() {
  return (
    <div className="px-2">
      <Skeleton height={300} width={180} />
    </div>
  )
}
