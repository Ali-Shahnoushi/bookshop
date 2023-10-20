import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Skeleton from 'react-loading-skeleton'
import { BsBookmark, BsFiletypePdf, BsFillBookmarkFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { BiBookAlt } from 'react-icons/bi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css/autoplay'
import ProductSlide from '../components/Product/ProductSlide'
import SectionTitle from '../components/SectionTitle/SectionTitle'

import 'swiper/css'
import 'swiper/css/navigation'
import { useNavigate, useParams } from 'react-router-dom'
import useGetOneBook from '../services/public/books/getOneBook'
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa'
import { AiFillGift } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useGetAllBooks from 'src/services/public/books/getAllBooks'
import UserCartContext from 'src/Context/UserCartContext'
import LoadingBar from 'react-top-loading-bar'

export default function ProductInfo() {
  const navigate = useNavigate()

  const [progress, setProgress] = useState(0)
  const [tabValue, setTabValue] = useState('1')
  const [isBookmarked, setBookmarked] = useState(false)
  // const [bookInfo, setBookInfo] = useState({})
  const [showMore, setShowMore] = useState(false)
  const [allCartItems, setAllCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  )

  // const [bookName, setBookName] = useState('')
  // const [bookWriter, setBookWriter] = useState('')
  // const [bookDetails, setBookDetails] = useState({})
  // const [aboutWriter, setAboutWriter] = useState('')
  // const [bookTranslator, setBookTranslator] = useState('')
  // const [bookTags, setBookTags] = useState([])
  // const [bookCover, setBookCover] = useState([])
  // const [bookPrice, setBookNPrice] = useState({})
  // const [bookPub, setBookPub] = useState('')
  // const [bookComments, setBookComments] = useState([])
  // const [htmlTemplate, setHtmlTemplate] = useState(
  //   <React.Fragment></React.Fragment>,
  // )

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleBookmark = () => {
    setBookmarked(!isBookmarked)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const { data: books } = useGetAllBooks()
  const params = useParams()
  const { data: bookInfos, isLoading } = useGetOneBook(params.productID)
  if (!isLoading) {
    console.log(bookInfos.data)
  }

  const addToCart = (name) => {
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: `کتاب ${name} به سبد خرید شما اضافه شد`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#bbb',
      confirmButtonText: 'مشاهده سبد خرید',
      cancelButtonText: 'بسیارخب',
      timer: 3000,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/cart')
      }
    })

    let allBooks = books.data.data

    let filteredBookByName = allBooks.filter((book) => book.name === name)
    let cartTemp = allCartItems

    UserCartContext.cart = allCartItems

    cartTemp.push(filteredBookByName[0])
    setAllCartItems(cartTemp)

    console.log(allCartItems)

    let jsonString = JSON.stringify(allCartItems)

    localStorage.setItem('cartItems', jsonString)
  }

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 500)
  }, [isLoading])

  return (
    <React.Fragment>
      <Header />
      <div>
        <LoadingBar
          color="#06B6D4"
          progress={progress}
          height={4}
          loaderSpeed={700}
          onLoaderFinished={() => setProgress(0)}
        />
      </div>
      {isLoading ? (
        // LoadingTopSection
        <div className="my-4 flex flex-col md:flex-row p-4 justify-between">
          <div className="hidden md:block w-full w-8/12 flex flex-row justify-between">
            <div className="w-full p-2 w-8/12 flex flex-col gap-2 items-center justify-center">
              <Skeleton height={30} width={500} borderRadius={'4px'} />
              <Skeleton height={30} width={500} borderRadius={'4px'} />
              <Skeleton height={30} width={500} borderRadius={'4px'} />
            </div>
            <div className="w-full p-2 w-8/12 flex flex-col gap-2 items-center justify-center">
              <Skeleton height={20} width={500} borderRadius={'4px'} />
              <Skeleton height={20} width={500} borderRadius={'4px'} />
              <Skeleton height={20} width={500} borderRadius={'4px'} />
              <Skeleton height={20} width={500} borderRadius={'4px'} />
            </div>
          </div>
          <div className="w-full w-4/12 flex justify-center">
            <Skeleton height={360} width={240} borderRadius={'12px'} />
          </div>
        </div>
      ) : (
        // TopSection
        <div className="my-4 flex flex-col md:flex-row p-4">
          <div className="w-full w-8/12 flex flex-col-reverse md:flex-row">
            <div className="w-full flex flex-col gap-2 items-center justify-center p-6">
              <div className="shadow-custom rounded-xl flex flex-col w-full h-full p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-end flex-row  items-center gap-1">
                    <h2 className="text-gray-600 text-lg">خرید نسخه فیزیکی</h2>
                    <BiBookAlt />
                  </div>
                  <div className="flex flex-row-reverse justify-start gap-5 items-center">
                    <span className="text-gray-500 text-md">قیمت</span>
                    <span className="text-xl text-slate-800 font-medium ">
                      {bookInfos.data.price}{' '}
                      <span className="text-sm font-normal text-slate-500">
                        تومان
                      </span>
                    </span>
                  </div>
                  <div className="text-center flex flex-row sm:flex-col md:flex-row justify-center">
                    <button
                      onClick={() => {
                        addToCart(bookInfos.data.name)
                      }}
                      className="flex items-center gap-2 text-[12px] md:text-base hover:bg-teal-600 transition duration-200 bg-teal-500 p-[10px] md:py-2 lg:px-5 text-white rounded-lg"
                    >
                      افزودن به سبد خرید <FaCartPlus />
                    </button>
                  </div>
                </div>
                <hr className="border my-4" />
                <div className="flex flex-col gap-4">
                  <div className="flex justify-end flex-row items-center gap-1">
                    <h2 className="text-gray-600 text-lg">
                      خرید نسخه الکترونیک
                    </h2>
                    <BsFiletypePdf />
                  </div>
                  <div className="flex flex-row-reverse justify-start gap-5 items-center">
                    <span className="text-gray-500 text-md">قیمت</span>
                    <span className="text-xl text-slate-800 font-medium ">
                      {bookInfos.data.price}{' '}
                      <span className="text-sm font-normal text-slate-500">
                        تومان
                      </span>
                    </span>
                  </div>
                  <div className="text-center flex flex-row sm:flex-col md:flex-row gap-2 justify-center md:justify-evenly">
                    <button
                      onClick={() => {
                        addToCart(bookInfos.data.name)
                      }}
                      className="flex items-center gap-2 text-[12px] md:text-base hover:bg-slate-300 transition duration-200 bg-slate-200 text-gray-600 py-2 px-5 rounded-lg"
                    >
                      هدیه کتاب به دیگران <AiFillGift />
                    </button>
                    <button
                      onClick={() => {
                        addToCart(bookInfos.data.name)
                      }}
                      className="flex items-center gap-2 text-[12px] md:text-base hover:bg-teal-600 transition duration-200 bg-teal-500 p-[10px] md:py-2 lg:px-5 text-white rounded-lg"
                    >
                      خرید و مطالعه کتاب <FaCartArrowDown />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full w-8/12 flex flex-col gap-2 items-end justify-evenly">
              <h2 className="text-2xl font-normal">{bookInfos.data.name}</h2>
              <div className="flex flex-col gap-2 direction-rtl">
                <div className="text-[14px] text-slate-700">
                  نویسنده : <span>{bookInfos.data.writer.name}</span>
                </div>
                {bookInfos.data.translators.length > 0 && (
                  <div className="text-[14px] text-slate-700">
                    مترجم :{' '}
                    <span>
                      {bookInfos.data.translators.map((translator, id) => {
                        if (id == bookInfos.data.translators.length - 1) {
                          return <span key={id}>{translator.name}</span>
                        } else {
                          return (
                            <span key={id}>
                              {translator.name}
                              {' - '}
                            </span>
                          )
                        }
                      })}
                    </span>
                  </div>
                )}
                <div className="text-[14px] text-slate-700">
                  نشر :{' '}
                  <span>
                    انتشارات
                    {'234jdfdfg'}
                    {/* {bookPub} */}
                  </span>
                </div>
                <div className="text-[14px] text-slate-700">
                  موضوع :{' '}
                  <span>
                    {bookInfos.data.categories.map((category, index) => {
                      return (
                        <Link
                          to={`/category/${category.url}`}
                          key={index}
                          className="py-[3px] rounded-md mr-1 text-[12px] text-white px-[6px] bg-teal-500"
                        >
                          {category.name}
                          {'‌'}
                        </Link>
                      )
                    })}
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-row justify-end gap-4">
                {isBookmarked ? (
                  <BsFillBookmarkFill
                    onClick={() => {
                      handleBookmark()

                      Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'محصول مورد نظر از علاقه‌مندی ها حذف شد',
                        showConfirmButton: false,
                        timer: 2000,
                      })
                    }}
                    className="select-none text-xl text-cyan-600 cursor-pointer"
                  />
                ) : (
                  <BsBookmark
                    onClick={() => {
                      handleBookmark()

                      Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'محصول مورد نظر ذخیره شد',
                        showConfirmButton: false,
                        timer: 2000,
                      })
                    }}
                    className="select-none text-xl text-cyan-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full p-14 sm:p-0 md:w-4/12">
            <div className="flex justify-center">
              <img
                className="select-none w-[250px]"
                src={bookInfos.data.photo}
              />
            </div>
          </div>
        </div>
      )}

      <hr className="mb-8 bt-4" />

      {isLoading ? (
        // LoadingDetailsSection
        <div className="w-full p-3 md:w-8/12 mx-auto">
          <Skeleton height={15} count={3} width={'100%'} />
        </div>
      ) : (
        // DetailsSection
        <React.Fragment>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={tabValue}>
              <Box className="direction-rtl">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  centered
                >
                  <Tab label="معرفی کتاب" value="1" defaultChecked />
                  <Tab label="جزئیات محصول" value="2" />
                  <Tab label="دیدگاه‌ها" value="3" />
                </TabList>
              </Box>
              {/* book Introduce Tab */}
              <TabPanel value="1">
                <div className="w-full p-3 md:w-8/12 mx-auto direction-rtl">
                  {/* {htmlTemplate} */}
                  <hr />
                  <h2 className="text-[20px] my-4 text-gray-700">
                    معرفی نویسنده
                  </h2>
                  <h3 className="text-[18px] text-gray-600 my-2">
                    {'sdfsdfsdf'}
                    {/* {bookWriter} */}
                  </h3>
                  <p
                    className={`text-slate-500 leading-8 mb-3 overflow-y-hidden ${
                      showMore ? 'h-max' : 'h-[130px]'
                    }`}
                  >
                    {/* {aboutWriter} */}
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        handleShowMore()
                      }}
                      className="border rounded-lg py-1 px-3 border-2 text-slate-500 text-sm"
                    >
                      بیشتر...
                    </button>
                  </div>
                </div>
              </TabPanel>
              {/* Details Tab */}
              <TabPanel value="2">
                <div className="w-full p-3 md:w-8/12 mx-auto direction-rtl">
                  <table class="table-fixed table-custom flex flex-row gap-0 md:gap-[150px]">
                    <thead className="text-right flex flex-col justify-center">
                      <tr>
                        <th>نام کتاب</th>
                      </tr>
                      <tr>
                        <th>نویسنده</th>
                      </tr>
                      {bookInfos.data.translators.length > 0 && (
                        <tr>
                          <th>مترجم</th>
                        </tr>
                      )}
                      <tr>
                        <th>سال چاپ</th>
                      </tr>
                      <tr>
                        <th>نوبت چاپ</th>
                      </tr>
                      <tr>
                        <th>تعداد صفحات</th>
                      </tr>
                      <tr>
                        <th>موجودی</th>
                      </tr>
                      <tr>
                        <th>نوع جلد</th>
                      </tr>
                      <tr>
                        <th>اندازه</th>
                      </tr>
                    </thead>
                    <tbody className="text-right grow flex flex-col justify-center">
                      <tr>
                        <td>{bookInfos.data.name}</td>
                      </tr>
                      <tr>
                        <td>{bookInfos.data.writer.name}</td>
                      </tr>
                      {bookInfos.data.translators.length > 0 && (
                        <tr>
                          <div>
                            <span>
                              {bookInfos.data.translators.map(
                                (translator, id) => {
                                  if (
                                    id ==
                                    bookInfos.data.translators.length - 1
                                  ) {
                                    return (
                                      <span key={id}>{translator.name}</span>
                                    )
                                  } else {
                                    return (
                                      <span key={id}>
                                        {translator.name}
                                        {' - '}
                                      </span>
                                    )
                                  }
                                },
                              )}
                            </span>
                          </div>
                        </tr>
                      )}
                      <tr>
                        <td>{bookInfos.data.publish_year}</td>
                      </tr>
                      <tr>
                        <td>{bookInfos.data.print_series}</td>
                      </tr>
                      <tr>
                        <td>{bookInfos.data.pages}</td>
                      </tr>
                      <tr>
                        <td>{bookInfos.data.count}</td>
                      </tr>
                      <tr>
                        <td>{bookInfos.data.book_cover_type}</td>
                      </tr>
                      <tr>{/* <td>{bookDetails.coverMaterial}</td> */}</tr>
                      <tr>{/* <td>{bookDetails.size}</td> */}</tr>
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              {/* Comments Tab */}
              <TabPanel value="3">
                <div className="w-full p-3 md:w-8/12 mx-auto direction-rtl">
                  {/* comment Form */}
                  <div className="flex items-center justify-center">
                    <form className="flex flex-col w-full items-center">
                      <h2 className="text-lg text-gray-600 mb-4">
                        نظر شما راجب این کتاب چیه؟
                      </h2>
                      <div className="w-full flex flex-col sm:flex-row justify-evenly">
                        <span className="flex gap-4 items-center my-3">
                          <label
                            className="text-sm text-gray-600"
                            htmlFor="name"
                          >
                            نام و نام خانوادگی*
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="نام خود را وارد کنید"
                            className="w-full text-sm py-2 bg-slate-50 px-4 rounded-md outline-0 border border-slate-200"
                          />
                        </span>
                        <span className="flex gap-4 items-center my-3">
                          <label
                            className="text-sm text-gray-600"
                            htmlFor="email"
                          >
                            ایمیل*
                          </label>
                          <input
                            id="email"
                            type="text"
                            placeholder="ایمیل خود را وارد کنید"
                            className="w-full text-sm py-2 bg-slate-50 px-4 rounded-md outline-0 border border-slate-200"
                          />
                        </span>
                      </div>
                      <div className="flex mx-auto my-6 w-full md:w-10/12">
                        <textarea
                          className="bg-slate-50 outline-0 p-4 rounded-lg text-slate-600 w-full bg-blue-100 border border-slate-200"
                          rows="10"
                          placeholder="نظر خود را بنویسید..."
                        ></textarea>
                      </div>
                      <button
                        class="px-4 mb-8 py-2 bg-emerald-500 text-sm text-white rounded-full"
                        type="submit"
                      >
                        ارسال نظر
                      </button>
                    </form>
                  </div>

                  {/* comments */}
                  {/* {bookComments.map((comment, index) => (
                    <div
                      key={index}
                      className={`${
                        comment.isAnswer ? 'pr-5 md:pr-10 lg:pr-20' : 'p-0'
                      }`}
                    >
                      <div className="p-5 bg-slate-100 mb-5 rounded-xl relative">
                        {comment.isAnswer && (
                          <span className="absolute left-4 top-3 text-[9px] md:text-[12px] bg-sky-500 px-2 py-1 text-white rounded-full">
                            پاسخ
                          </span>
                        )}
                        <div className="flex items-center gap-2">
                          {comment.role === 'ADMIN' ? (
                            <div className="flex items-center gap-1">
                              <HiUserCircle className="text-3xl text-slate-500" />
                              <span className="text-sm md:text-md">
                                {comment.username}
                              </span>
                              <BiSolidBadgeCheck className="text-blue-600" />
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <HiUserCircle className="text-3xl text-slate-500" />
                              <span className="text-sm md:text-md">
                                {comment.username}
                              </span>
                            </div>
                          )}
                        </div>

                        <div
                          className={`absolute top-4 text-[12px] text-gray-700 ${
                            comment.isAnswer ? 'left-16' : 'left-4'
                          }`}
                        >
                          {comment.date}
                        </div>
                        <div className="py-3 text-[13px] md:text-sm text-slate-600">
                          {comment.text}
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </TabPanel>
            </TabContext>
          </Box>

          {/* Related Books */}
          <div className="my-3">
            <SectionTitle title="کتاب های مرتبط" />
            <div className="w-full p-3 md:w-8/12 mx-auto">
              <Swiper
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                centeredSlides={true}
                breakpointsBase="480"
                breakpoints={{
                  // when window width is >= 640px
                  480: {
                    width: 640,
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                  1024: {
                    width: 768,
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
                modules={[Navigation, Autoplay]}
                spaceBetween={12}
                slidesPerView={1}
                navigation
              >
                {relatedBooks.map((book, index) => (
                  <SwiperSlide key={index}>
                    <ProductSlide
                      // cover={book.cover}
                      // writer={book.writer}
                      // name={book.name}
                      cover={'asd'}
                      writer={'asdfsdf'}
                      name={'sdfsdf'}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* divider */}
          <div className="w-full md:w-8/12 mx-auto">
            <hr className="my-4 border-gray-200" />
          </div>

          {/* current Writer Books */}
          <div className="my-3">
            <SectionTitle title="کتاب های همین نویسنده" />
            <div className="w-full p-3 md:w-8/12 mx-auto">
              <Swiper
                loop={true}
                speed={1500}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                centeredSlides={true}
                breakpointsBase="480"
                breakpoints={{
                  // when window width is >= 640px
                  480: {
                    width: 640,
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  // when window width is >= 768px
                  768: {
                    width: 768,
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                  1024: {
                    width: 768,
                    slidesPerView: 5,
                    spaceBetween: 24,
                  },
                }}
                spaceBetween={12}
                slidesPerView={1}
                navigation
              >
                {currentWriterBooks.map((book, index) => (
                  <SwiperSlide key={index}>
                    <ProductSlide
                      // cover={book.cover}
                      // writer={book.writer}
                      // name={book.name}
                      cover={'asd'}
                      writer={'asdfsdf'}
                      name={'sdfsdf'}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </React.Fragment>
      )}
      <Footer />
    </React.Fragment>
  )
}
