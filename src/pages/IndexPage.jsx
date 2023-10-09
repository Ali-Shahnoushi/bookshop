import React, { useContext, useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css/autoplay'
import 'swiper/css'
import SectionTitle from '../components/SectionTitle/SectionTitle'
import ProductSlide from '../components/Product/ProductSlide'
import LoadingProduct from '../components/LoadingProduct/LoadingProduct'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import UserCartContext from '../Context/UserCartContext'
import useGetAllBooks from '../services/public/books/Index'

export default function IndexPage() {
  const userCartContext = useContext(UserCartContext)
  const { data: books, isLoading } = useGetAllBooks()
  const [countItemsHeader, setCountItemsHeader] = useState(0)
  const navigate = useNavigate()
  const [allCartItems, setAllCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  )

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

    userCartContext.cart = allCartItems

    cartTemp.push(filteredBookByName[0])
    setAllCartItems(cartTemp)

    console.log(allCartItems)

    let jsonString = JSON.stringify(allCartItems)

    localStorage.setItem('cartItems', jsonString)

    setCountItemsHeader(
      JSON.parse(localStorage.getItem('cartItems')).length || 0,
    )
  }

  return (
    <React.Fragment>
      <Header countItems={countItemsHeader} />
      {/* Header banner */}
      <div className="w-full flex justify-center bg-teal-600 h-[400px]">
        <div className="w-1/2 flex flex-col-reverse md:flex-row md:justify-between gap-4">
          <div className="flex justify-center items-end">
            <img
              className="w-[160px] md:w-full"
              src="/images/Taaghche_Banner.webp"
            />
          </div>
          <div className="mb-8 flex items-center flex-col justify-center">
            <h2 className="text-white text-center text-lg md:text-3xl font-normal">
              لذت خواندن و شنیدن کتاب‌ها
            </h2>
            <hr className="w-full bg-white h-[2px] my-4" />
            <p className="text-center text-sm md:text-md text-white">
              خرید نسخه‌ی قانونی بیش از ۱۱۰,۰۰۰ کتاب صوتی، الکترونیکی و چاپی
            </p>
            <button className="bg-red-400 text-white py-2 px-4 rounded-full border border-white mt-4">
              نصب اپلیکیشن کتابینو
            </button>
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="p-4 bg-slate-100 p-4 flex justify-center">
        <div className="w-full md:w-1/2 flex flex-row  justify-between">
          <div className="flex flex-col w-3/12 items-center">
            <img className="w-[64px] mb-2" src="/images/FreeBooks.webp" />
            <span className="text-center text-[12px] md:text-[14px] text-gray-700">
              امکان دانلود +۲۰ هزار کتاب رایگان
            </span>
          </div>
          <div className="flex flex-col w-3/12 items-center">
            <img className="w-[64px] mb-2" src="/images/NewBooks.webp" />
            <span className="text-center text-[12px] md:text-[14px] text-gray-700">
              خرید کتاب های جدید و پرفروش
            </span>
          </div>
          <div className="flex flex-col w-3/12 items-center">
            <img className="w-[64px] mb-2" src="/images/Infinity.webp" />
            <span className="text-center text-[12px] md:text-[14px] text-gray-700">
              امکان خرید اشتراک ماهانه برای +۳۱ هزار کتاب
            </span>
          </div>
        </div>
      </div>

      {/* Slider banner */}
      <div className="flex my-10 justify-center">
        <div className="w-10/12 lg:w-8/12">
          <Swiper
            speed={1500}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            breakpointsbase="480"
            breakpoints={{
              // when window width is >= 640px
              480: {
                width: 640,
                slidesPerView: 1,
                spaceBetween: 16,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1024: {
                width: 768,
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            spaceBetween={12}
            slidesPerView={1}
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <img
                className="rounded-lg"
                src="/images/slider/63825275924953768693.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="rounded-lg"
                src="/images/slider/63825275992197419846.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="rounded-lg"
                src="/images/slider/63825276009525810138.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="rounded-lg"
                src="/images/slider/63825276797347426351.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="rounded-lg"
                src="/images/slider/63825281262326595220.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      {/* banner */}
      <div className="w-full px-2 lg:p-0 lg:w-[1200px] my-4 mx-auto flex justify-center">
        <img className="rounded-2xl" src="images/banners/020410.jpg" />
      </div>

      {/* best seller section */}
      <div className="mb-20">
        <SectionTitle
          title="کتاب های پرفروش"
          description="کتاب‌هایی که به تازگی پرفروش بوده اند"
          link={'best-seller/'}
        />
        <div className="flex my-6 justify-center">
          <div className="w-10/12 lg:w-8/12">
            <Swiper
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpointsbase="480"
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
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  width: 768,
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              spaceBetween={12}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {isLoading
                ? Array(5)
                    .fill({})
                    .map((x, index) => (
                      <SwiperSlide key={index}>
                        <LoadingProduct />
                      </SwiperSlide>
                    ))
                : books.data.data.map((book, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductSlide
                          onAdd={addToCart}
                          cover={book.photo}
                          writer={book.writer.name}
                          name={book.name}
                          price={book.price}
                        />
                      </SwiperSlide>
                    )
                  })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* banner */}
      <div className="w-full lg:w-[1200px] px-2 lg:p-0 my-4 mx-auto flex justify-center">
        <img className="rounded-2xl" src="images/banners/020411.jpg" />
      </div>
      {/* our offer */}
      <div>
        <SectionTitle
          title="پیشنهاد کتابینو"
          description=""
          link={'our-offer/'}
        />
        <div className="flex my-6 justify-center">
          <div className="w-10/12 lg:w-8/12">
            <Swiper
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpointsbase="480"
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
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  width: 768,
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              spaceBetween={12}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {isLoading
                ? Array(5)
                    .fill({})
                    .map((x, index) => (
                      <SwiperSlide key={index}>
                        <LoadingProduct />
                      </SwiperSlide>
                    ))
                : books.data.data.map((book, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductSlide
                          onAdd={addToCart}
                          cover={book.photo}
                          writer={book.writer.name}
                          name={book.name}
                          price={book.price}
                        />
                      </SwiperSlide>
                    )
                  })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* banner */}
      <div className="w-full lg:w-[1200px] px-2 lg:p-0 my-4 mx-auto flex justify-center">
        <img className="rounded-2xl" src="images/banners/020412.jpg" />
      </div>
      {/* free books */}
      <div>
        <SectionTitle
          title="کتاب های رایگان"
          description=""
          link={'free-books/'}
        />
        <div className="flex my-6 justify-center">
          <div className="w-10/12 lg:w-10/12 lg:w-8/12">
            <Swiper
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpointsbase="480"
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
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  width: 768,
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              spaceBetween={12}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {isLoading
                ? Array(5)
                    .fill({})
                    .map((x, index) => (
                      <SwiperSlide key={index}>
                        <LoadingProduct />
                      </SwiperSlide>
                    ))
                : books.data.data.map((book, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductSlide
                          onAdd={addToCart}
                          cover={book.photo}
                          writer={book.writer.name}
                          name={book.name}
                          price={book.price}
                        />
                      </SwiperSlide>
                    )
                  })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* banner */}
      <div className="w-full lg:w-[1200px] px-2 lg:p-0 my-4 mx-auto flex justify-center">
        <img className="rounded-2xl" src="images/banners/020290.jpg" />
      </div>
      {/* education books */}
      <div>
        <SectionTitle
          title="درسی و کمک درسی"
          description=""
          link={'education-books/'}
        />
        <div className="flex my-6 justify-center">
          <div className="w-10/12 lg:w-8/12">
            <Swiper
              speed={1500}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpointsbase="480"
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
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1024: {
                  width: 768,
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              spaceBetween={12}
              slidesPerView={1}
              pagination={{ clickable: true }}
            >
              {isLoading
                ? Array(5)
                    .fill({})
                    .map((x, index) => (
                      <SwiperSlide key={index}>
                        <LoadingProduct />
                      </SwiperSlide>
                    ))
                : books.data.data.map((book, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ProductSlide
                          onAdd={addToCart}
                          cover={book.photo}
                          writer={book.writer.name}
                          name={book.name}
                          price={book.price}
                        />
                      </SwiperSlide>
                    )
                  })}
            </Swiper>
          </div>
        </div>
      </div>
      {/* banner */}
      <div className="w-full lg:w-[1200px] px-2 lg:p-0 my-4 mx-auto flex justify-center">
        <img className="rounded-2xl" src="/images/banners/020413.jpg" />
      </div>
      <Footer />
    </React.Fragment>
  )
}
