import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../../../Context/AuthContext'
import Swal from 'sweetalert2'
import { HiHome } from 'react-icons/hi'
import {
  BiSolidCommentDetail,
  BiSolidCategory,
  BiSolidBook,
} from 'react-icons/bi'
import { MdArticle } from 'react-icons/md'
import { FaUserEdit } from 'react-icons/fa'
import { BsTranslate } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'

export default function AdminSidebar() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const logoutUser = () => {
    const userLocalStorageData = JSON.parse(localStorage.getItem('user'))

    if (userLocalStorageData) {
      fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userLocalStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          authContext.logout()
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: result.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'بسیارخب',
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/')
            }
          })
        })
    }
  }

  return (
    <div>
      <aside>
        <h2 className="text-center text-xl text-sky-200 font-[500]">
          <img
            className="w-[80px] md:w-fit mb-2 sm:mb-0"
            src="/images/logo.svg"
          />
        </h2>
        <ul className="mt-8 sidebar-menu-list">
          <li>
            <NavLink to="index">
              <div className="flex gap-2 items-center">
                <HiHome />
                <span>داشبورد</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="books">
              <div className="flex gap-2 items-center">
                <BiSolidBook />
                <span>کتاب ها</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="categories">
              <div className="flex gap-2 items-center">
                <BiSolidCategory />
                <span>دسته بندی ها</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="writers">
              <div className="flex gap-2 items-center">
                <FaUserEdit />
                <span>نویسندگان</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="translators">
              <div className="flex gap-2 items-center">
                <BsTranslate />
                <span>مترجمان</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="posts">
              <div className="flex gap-2 items-center">
                <MdArticle />
                <span>مقالات</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="users">
              <div className="flex gap-2 items-center">
                <FiUsers />
                <span>کابران</span>
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink to="comments">
              <div className="flex gap-2 items-center">
                <BiSolidCommentDetail />
                <span>نظرات</span>
              </div>
            </NavLink>
          </li>
          <li>
            <button onClick={logoutUser}>خروج</button>
          </li>
        </ul>
      </aside>
    </div>
  )
}
