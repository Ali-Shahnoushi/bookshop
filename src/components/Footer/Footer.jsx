import React from 'react'
import './Footer.css'
import { BsTablet } from 'react-icons/bs'
import { BsLaptop } from 'react-icons/bs'
import { AiFillAndroid } from 'react-icons/ai'
import { AiFillApple } from 'react-icons/ai'
import { SiAparat } from 'react-icons/si'
import { BsInstagram } from 'react-icons/bs'
import { BsTwitter } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer>
      <div className="p-10 bg-slate-50 w-full">
        <div className="w-full lg:container flex flex-row-reverse justify-evenly items-start">
          <div className="hidden xl:block col-footer-sec text-[13px] text-right text-gray-500">
            <ul className="ketabino-footer">
              <h2 className="my-2 text-[16px] text-gray-600">کتابینو</h2>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">ورود ناشران</a>
              </li>
              <li>
                <a href="#">تماس با ما</a>
              </li>
              <li>
                <a href="#">همکاری با ما</a>
              </li>
              <li>
                <a href="#">وبلاگ</a>
              </li>
              <li>
                <a href="#">رصد</a>
              </li>
              <li>
                <a href="#">راهنما</a>
              </li>
              <li>
                <a href="#">شرایط استفاده</a>
              </li>
              <li>
                <a href="#">حریم خصوصی</a>
              </li>
              <li>
                <a href="#">RSS کتاب‌ها</a>
              </li>
            </ul>
          </div>
          <div className="hidden xl:block col-footer-sec text-[13px] text-right text-gray-500">
            <ul className="ketabino-footer">
              <h2 className="my-2 text-[16px] text-gray-600">
                کتاب‌های پیشنهادی
              </h2>
              <li>
                <a href="#">بهترین سال های زندگی تو</a>
              </li>
              <li>
                <a href="#">تخت‌خوابت را مرتب کن</a>
              </li>
              <li>
                <a href="#">مردی به نام اوه</a>
              </li>
              <li>
                <a href="#">اثر مرکب</a>
              </li>
              <li>
                <a href="#">ملت عشق</a>
              </li>
              <li>
                <a href="#">چگونه کمال‌گرا نباشیم؟</a>
              </li>
              <li>
                <a href="#">نردبان شکسته</a>
              </li>
              <li>
                <a href="#">نیمه تاریک وجود</a>
              </li>
              <li>
                <a href="#">جنایت و مکافات</a>
              </li>
              <li>
                <a href="#">بیشئوری</a>
              </li>
              <li>
                <a href="#">برادران کارامازوف</a>
              </li>
              <li>
                <a href="#">بی‌نوایان</a>
              </li>
              <li>
                <a href="#">کیمیاگر</a>
              </li>
              <li>
                <a href="#">بازی نامحدود</a>
              </li>
            </ul>
          </div>
          <div className="hidden xl:block col-footer-sec text-[13px] text-right text-gray-500">
            <ul className="ketabino-footer">
              <h2 className="my-2 text-[16px] text-gray-600">
                دسته‌بندی پیشنهادی
              </h2>
              <li>
                <a href="#">کتاب‌های دانشگاهی</a>
              </li>
              <li>
                <a href="#">کتاب‌های نوجوان</a>
              </li>
              <li>
                <a href="#">زندگی‌نامه، سفرنامه و خاطرات</a>
              </li>
              <li>
                <a href="#">کتاب‌های کودک</a>
              </li>
              <li>
                <a href="#">کتاب‌های آموزشی</a>
              </li>
              <li>
                <a href="#">کتاب‌های رایگان</a>
              </li>
              <li>
                <a href="#">کتاب‌های تاریخ</a>
              </li>
              <li>
                <a href="#">کتاب‌های سبک زندگی</a>
              </li>
              <li>
                <a href="#">جنایت و مکافات</a>
              </li>
              <li>
                <a href="#">بیشئوری</a>
              </li>
              <li>
                <a href="#">برادران کارامازوف</a>
              </li>
              <li>
                <a href="#">بی‌نوایان</a>
              </li>
              <li>
                <a href="#">کیمیاگر</a>
              </li>
              <li>
                <a href="#">بازی نامحدود</a>
              </li>
            </ul>
          </div>
          <div className="col-footer-sec text-[13px] w-full md:w-unset text-right text-gray-500">
            <h2 className="my-2 text-[16px] text-gray-600">اپلیکیشن کتابینو</h2>
            <div className="flex items-center gap-4 mb-8">
              <button className="bg-cyan-500 rounded-lg text-white px-8 py-3">
                نصب اپلیکیشن کتابینو
              </button>
              <BsTablet className="text-2xl text-cyan-500" />
              <BsLaptop className="text-4xl text-cyan-500" />
              <AiFillAndroid className="text-4xl text-lime-500" />
              <AiFillApple className="text-4xl text-gray-500" />
            </div>
            <h2 className="my-2 text-[16px] text-gray-600">درخواست کتاب</h2>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="w-full">
                <p className="text-slate-400 block direction-rtl text-right">
                  کتاب مورد نظرتان را درخواست کنید تا در صورت امکان به فروشگاه
                  اضافه شود.
                </p>
              </div>
              <div className="w-full md:w-unset flex flex-col gap-4 md:gap-0 md:flex-row-reverse items-center">
                <input
                  type="text"
                  className="w-10/12 md:w-unset outline-0 bg-white p-2 direction-rtl border-gray-200 rounded-md border md:ml-3"
                  placeholder="نام کتاب"
                />
                <input
                  type="text"
                  className="w-10/12 md:w-unset outline-0 bg-white p-2 direction-rtl border-gray-200 rounded-md border md:ml-3"
                  placeholder="نام نویسنده"
                />
                <input
                  type="text"
                  className="w-10/12 md:w-unset outline-0 bg-white p-2 direction-rtl border-gray-200 rounded-md border md:ml-3"
                  placeholder="نام ناشر"
                />
                <button className="w-10/12 md:w-unset bg-cyan-500 rounded-lg text-white md:px-6 md:py-2 px-6 py-2 ">
                  ارسال
                </button>
              </div>
            </div>
            <h2 className="my-2 text-[16px] text-gray-600">پشتیبانی</h2>
            <div className="flex flex-row justify-between items-center gap-4">
              <div className="w-1/2">
                <p className="text-slate-800 block direction-rtl text-lg text-left">
                  ۰۲۱-۶۱۹۳۰۰۲۰
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-slate-400 block direction-rtl text-right">
                  هفت روز هفته (ساعت ۹ الی ۱۷)
                </p>
              </div>
            </div>
            <div className="social-sec-footer text-2xl flex flex-row">
              <SiAparat />
              <BsInstagram />
              <BsTwitter />
              <BsFacebook />
              <FaTelegramPlane />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-center p-2 direction-rtl text-[13px] bg-gray-300">
          © کلیه حقوق این وب‌سایت محفوظ می‌باشد.
        </p>
      </div>
    </footer>
  )
}
