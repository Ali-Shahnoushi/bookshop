import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

export default function Categories() {
  const userLocalStorageData = JSON.parse(localStorage.getItem('user'))
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState([])
  const persian = new Intl.NumberFormat('fa')

  useEffect(() => {
    fetch('http://localhost:8000/api/main_category  ', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data)
      })

    fetch('http://localhost:8000/api/tag  ', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userLocalStorageData.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTags(data.data.data)
        setIsLoading(false)
      })
  }, [])
  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-slate-700">لیست دسته بندی ها</h2>

      {isLoading ? (
        <div className="flex flex-row-reverse gap-6">
          <div className="w-[50%]">
            <Skeleton
              height={45}
              count={8}
              baseColor="#fff"
              highlightColor="#E0F2FE"
            />
          </div>
          <div className="w-[50%]">
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
          <div className="overflow-x-auto">
            <div className="inline-block w-full">
              <div className="overflow-hidden flex gap-6">
                {categories.length > 0 && (
                  <table className="w-1/2 text-center text-sm font-regular h-fit">
                    <thead className="border-b text-white bg-slate-600 border-neutral-500 text-neutral-800">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          نام دسته بندی
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          آدرس دسته بندی
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          زیردسته بندی
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-500 bg-white"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {persian.format(index + 1)}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {category.name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {category.url}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {category.categories.length || 0}
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
                {tags.length > 0 && (
                  <table className="w-1/2 text-center text-sm font-regular">
                    <thead className="border-b text-white bg-slate-600 border-neutral-500 text-neutral-800">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          نام تگ
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          آدرس تگ
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tags.map((tag, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-500 bg-white"
                        >
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {persian.format(index + 1)}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {tag.name}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {tag.url}
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
