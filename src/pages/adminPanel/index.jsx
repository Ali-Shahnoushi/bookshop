import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar/AdminSidebar'
import './admin-panel.css'
import AuthContext from '../../Context/AuthContext'
import moment from 'moment-jalaali'
import { AiOutlineUser } from 'react-icons/ai'
import { BiTime } from 'react-icons/bi'
import { MdDateRange } from 'react-icons/md'
import jalaali from 'jalaali-js'

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState()
  const authContext = useContext(AuthContext)
  const date = new Date() // current Gregorian date
  let shamsiDateReal = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
  }).format(date)

  function formatTimeValue(value) {
    return value < 10 ? `0${value}` : value
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const hours = formatTimeValue(date.getHours())
      const minutes = formatTimeValue(date.getMinutes())
      const seconds = formatTimeValue(date.getSeconds())

      const formattedTime = `${hours}:${minutes}:${seconds}`
      setCurrentTime(formattedTime)
    }, 1000)

    setInterval(() => {
      const persianDate = moment().format('jYYYY/jM/jD')
      setCurrentDate(persianDate)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div dir="rtl" className="flex  overflow-hidden h-[100vh]">
      <div className="sidebar-container w-full sm:w-4/12 md:w-3/12 lg:w-1/6 bg-sky-800 h-[150px] sm:h-screen p-5">
        <AdminSidebar />
      </div>
      <div className="bg-sky-100 overflow-x-hidden overflow-y-scroll w-full sm:w-8/12 md:w-9/12 lg:w-5/6">
        <div className="h-[100px] bg-sky-800 p-2 flex items-center justify-around">
          <div className="text-slate-200 flex gap-2 items-center">
            <AiOutlineUser /> {authContext.userData.name}{' '}
            {authContext.userData.lastname}
            {' عزیز , خوش آمدی'}
          </div>
          <div className="text-slate-200 flex gap-2 items-center">
            <BiTime />
            {currentTime}
          </div>
          <div className="text-slate-200 flex gap-2 items-center">
            <MdDateRange />
            <span dir="ltr">{shamsiDateReal}</span>
          </div>
        </div>
        <div className=" h-100 bg-sky-800">
          <div className="p-6 h-100 rounded-tr-2xl bg-[#E0F2FE]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
