import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../../../Context/AuthContext'
import Swal from 'sweetalert2'
import { HiHome } from 'react-icons/hi'
import {
  BiSolidCommentDetail,
  BiSolidCategory,
  BiSolidBook,
  BiMap,
  BiSupport,
} from 'react-icons/bi'
import { MdArticle, MdDiscount, MdLogout } from 'react-icons/md'
import {
  FaUserEdit,
  FaShoppingBasket,
  FaHeart,
  FaAddressCard,
} from 'react-icons/fa'
import { BsTranslate } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { IoMdNotifications } from 'react-icons/io'

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
            showConfirmButton: false,
            timer: 3000,
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
        <img
          className="w-[80px] md:w-fit mb-2 sm:mb-0"
          src="/images/logo.svg"
        />
        <ul className="mt-8 sidebar-menu-list">
          {authContext.userData.role == 'admin' ? (
            <>
              <li>
                <NavLink end to="/admin">
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
                <NavLink to="comments">
                  <div className="flex gap-2 items-center">
                    <MdDiscount />
                    <span>کدتخفیف‌ها</span>
                  </div>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink end to="/dashboard">
                  <div className="flex gap-2 items-center">
                    <HiHome />
                    <span>داشبورد</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="orders">
                  <div className="flex gap-2 items-center">
                    <FaShoppingBasket />
                    <span>سفارش‌ها</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="addresses">
                  <div className="flex gap-2 items-center">
                    <BiMap />
                    <span>آدرس‌ها</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="bookmarked">
                  <div className="flex gap-2 items-center">
                    <FaHeart />
                    <span>موردعلاقه‌ها</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="edit-account">
                  <div className="flex gap-2 items-center">
                    <FaAddressCard />
                    <span>اطلاعات حساب‌کاربری</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="notifications">
                  <div className="flex gap-2 items-center">
                    <IoMdNotifications />
                    <span>پیغام‌ها</span>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="tickets">
                  <div className="flex gap-2 items-center">
                    <BiSupport />
                    <span>تیکت‌ پشتیبانی</span>
                  </div>
                </NavLink>
              </li>
            </>
          )}
          <li>
            <div className="logout-btn flex gap-2 items-center">
              <MdLogout />
              <button onClick={logoutUser}>خروج</button>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  )
}
