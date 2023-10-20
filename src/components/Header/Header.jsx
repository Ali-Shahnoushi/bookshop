import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import { FiLogIn } from 'react-icons/fi'
import { BiSolidShoppingBag } from 'react-icons/bi'
import { FiUser } from 'react-icons/fi'
import { HiOutlineHome } from 'react-icons/hi'
import { BsList } from 'react-icons/bs'
import { MdOutlineTopic } from 'react-icons/md'
import { GoQuestion } from 'react-icons/go'
import { FaHandshake } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import UserCartContext from '../../Context/UserCartContext'

export default function Header({countItemsHeader}) {
  const authContext = useContext(AuthContext)
  const userCartContext = useContext(UserCartContext)
  const [showSideMenu, setshowSideMenu] = useState(false)
  const [showBookLists, setShowBookLists] = useState(false)
  const [mainCategory, setMainCategory] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/main_category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMainCategory(data.data)
      })
    console.log(authContext.isLoading)
  }, [])

  return (
    <React.Fragment>
      {/* desktop header */}

      <div className="w-full h-[150px] shadow-lg p-2">
        <div className="container mx-auto">
          <div className="w-full p-2 flex flex-col sm:flex-row-reverse justify-between items-center">
            <img
              className="w-[80px] md:w-fit mb-2 sm:mb-0"
              src="/images/logo.svg"
            />
            <input
              type="text"
              placeholder="دنبال چه کتابی می‌گردی؟"
              className="direction-rtl p-2 my-2 lg:m-0 w-full sm:w-1/2 md:w-5/12 text-gray-600 outline-0 rounded-lg text-sm bg-gray-100 md:p-3"
            />
            <div className="user flex flex-row items-end gap-4">
              {authContext.isLoggedIn ? (
                authContext.userData.role === 'admin' ? (
                  <Link to="/admin">
                    <button className="bg-cyan-500 inline-block py-1 px-2 rounded-md">
                      <span className="text-white text-sm align-middle">
                        سلام{', '}
                        {authContext.userData.name} عزیز
                      </span>
                      <FiUser className="text-lg md:text-2xl mt-2 sm:mt-0 text-white inline-block" />
                    </button>
                  </Link>
                ) : (
                  <Link to="/dashboard">
                    <button className="bg-cyan-500 inline-block py-1 px-2 rounded-md">
                      <span className="text-white text-sm align-middle">
                        سلام{', '}
                        {authContext.userData.name} عزیز
                      </span>
                      <FiUser className="text-lg md:text-2xl mt-2 sm:mt-0 text-white inline-block" />
                    </button>
                  </Link>
                )
              ) : (
                <div className="flex mt-2 sm:mt-0 mr-4 md:mr-12">
                  <FiLogIn className="text-xl mr-2 text-slate-500" />
                  <Link to="/login" className="text-[14px] text-slate-500">
                    ورود | ثبت‌نام
                  </Link>
                </div>
              )}

              <Link to="/cart" className="relative">
                <BiSolidShoppingBag className="text-lg mt-2 sm:mt-0 md:text-2xl text-cyan-500 mr-3" />
                <span className="items-count absolute top-[-9px] left-[-6px] rounded-full bg-cyan-600 text-white flex justify-center items-center text-[13px] h-[18px] w-[18px]">
                  {userCartContext.cart.length}
                </span>
              </Link>
              <HiMenu
                onClick={() => setshowSideMenu(!showSideMenu)}
                className="sm:hidden text-3xl absolute right-3 top-[106px] text-slate-500"
              />
            </div>
          </div>
          <div className="w-full p-2 flex">
            <ul className="hidden sm:flex gap-3 text-gray-600 text-[16px] mx-auto p-3 w-[600px] justify-between flex-row-reverse">
              <li className="text-[14px] md:text-[16px] hover:text-cyan-500 cursor-pointer transition-all duration-200 flex gap-1 items-center">
                <Link to="/" className="flex gap-1">
                  خانه
                  <HiOutlineHome className="text-lg" />
                </Link>
              </li>
              <li className="text-[14px] md:text-[16px] hover:text-cyan-500 cursor-pointer transition-all duration-200 flex gap-1 items-center">
                <span className="relative group">
                  دسته‌بندی ها
                  <div className="absolute z-50 md:block hidden right-[-150px] py-4 bg-transparent">
                    <div className="bg-white p-5 border border-gray-200 text-right w-[700px] h-[490px] shadow-lg rounded-lg hidden group-hover:block cursor-default">
                      <div className="pop-menu flex flex-row-reverse">
                        <div className="flex flex-row flex-wrap align-start">
                          {mainCategory.map((mainCat, index) => (
                            <div
                              key={index}
                              className="text-black mb-3 w-1/3 h-fit"
                            >
                              <h2 className="text-[14px] mb-2 font-bold text-gray-600">
                                <Link to={`/category/${mainCat.url}`}>
                                  {mainCat.name}
                                </Link>
                              </h2>
                              {mainCat.categories.length > 0 && (
                                <ul className="pr-3 flex flex-col gap-1">
                                  {mainCat.categories.map((cat, index) => (
                                    <li
                                      key={index}
                                      className="text-[13px] text-gray-600"
                                    >
                                      <Link
                                        to={`/category/${mainCat.url}/${cat.url}`}
                                      >
                                        {cat.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </span>{' '}
                <BsList className="text-lg" />
              </li>

              <li className="text-[14px] md:text-[16px] hover:text-cyan-500 cursor-pointer transition-all duration-200 flex gap-1 items-center">
                <Link to="/blog">مقالات</Link>{' '}
                <MdOutlineTopic className="text-lg" />
              </li>
              <li className="text-[14px] md:text-[16px] hover:text-cyan-500 cursor-pointer transition-all duration-200 flex gap-1 items-center">
                <Link to="/about">درباره ما</Link>{' '}
                <GoQuestion className="text-lg" />
              </li>
              <li className="text-[14px] md:text-[16px] hover:text-cyan-500 cursor-pointer transition-all duration-200 flex gap-1 items-center">
                <span>همکاری در فروش</span> <FaHandshake className="text-lg" />
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          showSideMenu ? 'right-[0px]' : 'right-[-500px]'
        } md:hidden transition-all duration-500 w-7/12 h-screen bg-white shadow-xl z-50 fixed top-0`}
      >
        <ul className="p-4 mt-5 direction-rtl flex flex-col gap-2">
          <li className="flex text-gray-700 mb-2 gap-1 items-center hover:text-cyan-500 cursor-pointer transition-all duration-200">
            <BsList className="text-lg" />
            <a
              href="#"
              onClick={() => {
                setShowBookLists(!showBookLists)
              }}
            >
              دسته‌بندی ها
            </a>
          </li>
          <div className={`${showBookLists ? 'h-fit px-3' : 'p-0 hidden'}`}>
            <ul className="booklist-mobile">
              <li>
                <Link to="/category/literature">رمان</Link>
              </li>
              <li>
                <Link to="/category/management">بازاریابی، فروش و مدیریت</Link>
              </li>
              <li>
                <Link to="/category/children">کودک</Link>
              </li>
              <li>
                <Link to="/category/feminism">زنان و فمینیسم</Link>
              </li>
              <li>
                <Link to="/category/law">حقوق</Link>
              </li>
              <li>
                <Link to="/category/economy">اقتصاد</Link>
              </li>
              <li>
                <Link to="/category/life-style">سبک زندگی</Link>
              </li>
              <li>
                <Link to="/category/history">تاریخ</Link>
              </li>
              <li>
                <Link to="/category/free-books">کتاب‌های رایگان</Link>
              </li>
              <li>
                <Link to="/category/teenagers">نوجوان</Link>
              </li>
              <li>
                <Link to="/category/english">English Books</Link>
              </li>
              <li>
                <Link to="/category/psychology">روانشناسی</Link>
              </li>
              <li>
                <Link to="/category/art">هنر</Link>
              </li>
              <li>
                <Link to="/category/philosoghy">فلسفه</Link>
              </li>
              <li>
                <Link to="/category/religion">دین و عرفان</Link>
              </li>
              <li>
                <Link to="/category/social-science">علوم اجتماعی</Link>
              </li>
              <li>
                <Link to="/category/science">علمی</Link>
              </li>
            </ul>
          </div>
          <li className="flex text-gray-700 mb-2 gap-1 items-center hover:text-cyan-500 cursor-pointer transition-all duration-200">
            <MdOutlineTopic className="text-lg" />
            <Link to="/blog">مقالات</Link>
          </li>
          <li className="flex text-gray-700 mb-2 gap-1 items-center hover:text-cyan-500 cursor-pointer transition-all duration-200">
            <GoQuestion className="text-lg" />
            <Link to="/about">درباره ما</Link>
          </li>
          <li className="flex text-gray-700 mb-2 gap-1 items-center hover:text-cyan-500 cursor-pointer transition-all duration-200">
            <FaHandshake className="text-lg" />
            <Link to="/category/test">همکاری در فروش</Link>
          </li>
        </ul>
      </div>
      <div
        onClick={() => {
          if (showSideMenu) {
            setshowSideMenu(false)
          }
        }}
        className={`${
          showSideMenu ? 'opacity-100' : 'opacity-0 z-[-1]'
        } md:hidden block transition-all duration-200 mobile-menu-trigger w-full h-screen bg-black bg-opacity-[0.4] z-10 fixed top-0 left-0`}
      ></div>
    </React.Fragment>
  )
}
