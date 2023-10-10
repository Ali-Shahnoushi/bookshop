import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'
import useGetAllBooks from '../../../services/public/books/getAllBooks'

export default function () {
  // const [books, setBooks] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const persian = new Intl.NumberFormat('fa')

  const { data: books, isLoading } = useGetAllBooks()

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-slate-700">لیست کتاب ها</h2>

      {isLoading ? (
        <div className="flex flex-row-reverse">
          <div className="w-[100%]">
            <Skeleton
              height={45}
              count={8}
              baseColor="#fff"
              highlightColor="#E0F2FE"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {books.data.data.length > 0 && (
                  <table className="min-w-full text-center text-sm font-regular">
                    <thead className="border-b text-white bg-slate-600 border-neutral-500 text-neutral-800">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          نام کتاب
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          نویسنده
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          دسته بندی
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          قیمت
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          موجودی
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.data.data.map((book, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-500 bg-white"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {persian.format(index + 1)}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {book.name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {book.writer.name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {book.categories[0].name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {persian.format(book.price)}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {persian.format(book.count)}
                          </td>
                          <td class="whitespace-nowrap text-[20px] px-6 py-4">
                            <button className="text-rose-500">
                              <AiTwotoneDelete />
                            </button>{' '}
                            <button className="text-sky-600">
                              <MdModeEditOutline />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
