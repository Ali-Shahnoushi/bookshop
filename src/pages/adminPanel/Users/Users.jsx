import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import Skeleton from 'react-loading-skeleton'

export default function Users() {
  const userLocalStorageData = JSON.parse(localStorage.getItem('user'))
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])
  const persian = new Intl.NumberFormat('fa')

  useEffect(() => {
    fetch('http://localhost:8000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userLocalStorageData.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data.data)
        setIsLoading(false)
      })
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold my-4 text-slate-700">لیست کاربران</h2>

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
                {users.length > 0 && (
                  <table class="min-w-full text-center text-sm font-regular">
                    <thead class="border-b text-white bg-slate-600 border-neutral-500 text-neutral-800">
                      <tr>
                        <th scope="col" class=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          نام
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          نام خانوادگی
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          ایمیل
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          شماره تلفن
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          نقش
                        </th>
                        <th scope="col" class=" px-6 py-4">
                          عملیات
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={index}
                          class="border-b border-neutral-500 bg-white"
                        >
                          <td class="whitespace-nowrap  px-6 py-4 font-medium">
                            {persian.format(index + 1)}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.name}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.lastname}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.email}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.phone == null ? '-' : user.phone}
                          </td>
                          <td class="whitespace-nowrap  px-6 py-4">
                            {user.role == 'admin' ? 'ادمین' : 'کاربر'}
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
