import React, { useEffect, useState } from 'react'
import './writers.css'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

export default function Writers() {
  const userLocalStorageData = JSON.parse(localStorage.getItem('user'))
  const [isLoading, setIsLoading] = useState(true)
  const [writers, setWriters] = useState([])
  const persian = new Intl.NumberFormat('fa')

  useEffect(() => {
    fetch('http://localhost:8000/api/writer', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userLocalStorageData.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWriters(data.data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-slate-700">لیست نویسندگان</h2>

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
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                {writers.length > 0 && (
                  <table class="min-w-full text-center text-sm font-regular">
                    <thead class="border-b text-white bg-slate-600 border-neutral-500 text-neutral-800">
                      <tr>
                        <th scope="col" class="w-[50px] px-6 py-4">
                          #
                        </th>
                        <th scope="col" class="w-[50px] px-6 py-4">
                          تصویر
                        </th>
                        <th scope="col" class="w-[150px] px-6 py-4">
                          نام و نام خانوادگی
                        </th>
                        <th scope="col" class="w-[600px] px-6 py-4">
                          توضیحات
                        </th>
                        <th scope="col" class="w-[50px] px-6 py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="writer-table-body">
                      {writers.map((user, index) => (
                        <tr
                          key={index}
                          class="border-b border-neutral-500 bg-white"
                        >
                          <td class="whitespace-nowrap  px-6 py-4 font-medium">
                            {persian.format(index + 1)}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4 text-center">
                            <img
                              src={user.photo}
                              className="w-[64px] mx-auto rounded-md"
                              alt=""
                            />
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.name}
                          </td>
                          <td class="whitespace-nowrap desc  px-6 py-4">
                            {user.description == null ? (
                              '-'
                            ) : (
                              <div>
                                <p>{user.description}</p>
                              </div>
                            )}
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
