import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProductSlide from '../components/Product/ProductSlide'
import Swal from 'sweetalert2'
export default function Articles() {
  const navigate = useNavigate()
  let { categoryName } = useParams()
  const [currentCategory, setCurrentCategory] = useState({})
  const [currentBooks, setCurrentBooks] = useState([])
  const [allCartItems, setAllCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  )

  const categories = [
    {
      nameId: 'literature',
      title: 'رمان',
      books: [
        {
          cover: '/images/books/4268_73746_normal.jpg',
          name: 'مردی به نام او',
          writer: 'فدریک بکمن',
          price: 120000,
        },
        {
          cover: '/images/books/62882_79534_normal.jpg',
          name: 'شب های روشن',
          writer: 'داستایفسکی',
          price: 90000,
        },
        {
          cover: '/images/books/63281_53977_normal.jpg',
          name: 'وقتی نیچه گریست',
          writer: 'اروین یالوم',
          price: 115000,
        },
      ],
      desc: (
        <div className="category-desc">
          <h2>چرا داستان و رمان بخوانیم؟</h2>
          <p>
            داستان‌ها به قدمت عمر بشر، عمر دارند. از زمانی که انسان زندگی جمعی
            را آغاز کرد و زبان شکل گرفت، داستان و قصه‌های شفاهی نیز آغاز شدند.
            مسیر دور و درازی که داستان‌ها در طی حیات خود پیموده‌اند، مسیری سخت و
            البته جذاب بوده است، از متل‌ها و قصه‌هایی که سینه به سینه منتقل
            می‌شدند تا رمان‌های کلاسیک، داستان‌های کوتاه و ادبیات پست‌مدرنیستی.
            در هیچ دوره‌ای انسان‌ها بی نیاز از داستان‌ها نیستند. زیرا شیرینی
            بی‌نظیر و تکرار نشدنی در این وجود دارد که در خیال دیگران غرق شویم و
            تجربیات ناب لحظه‌های دیگران را مال خود بدانیم. داستان محصول ذهن خلاق
            فردی به نام نویسنده است که شخصیت‌های داستانش را ساخته و پرداخته و به
            زبان ادبی روایت می‌کند. یک داستان خوب می‌تواند مسیر زندگی شما را
            تغییر دهد؛ زیرا خواننده را در تجربه‌ای همراه می‌کند که امکان تجربه‌
            کردنش برای او فراهم نیست. با در نظر گرفتن این نکته که هر انسان تنها
            یک‌بار زندگی می‌کند و یک تجربه منحصربفرد از زندگی دارد، داستان این
            اجازه را می‌دهد تا ما با تجربیاتی شگفت‌انگیز و گوناگون که عملا
            برایمان غیرممکن است آشنا شویم. از سفر به کره ماه تا پیمودن
            اقیانوس‌ها و کشف قاره‌ها همه رویاها و تخیلاتی بوده‌اند که پیش از
            محقق شدنشان به دست انسان‌ها در قالب داستان‌ها روایت شده‌اند. می‌توان
            گفت جهان بدون داستان اساسا جهانی بی‌معنی و گنگ است. انسان بدون
            داستان انسانِ بی‌تاریخ و بی‌تخیل است که زندگی‌اش بی‌معنا می‌شود.
            خواندن داستان و رمان حس و حال ما را تغییر می‌دهد و وجوه جدیدی به
            زندگیمان اضافه می‌کند.{' '}
          </p>
          <h3>نکاتی که پیش از خواندن رمان و داستان باید بدانیم:</h3>
          <ul dir="rtl">
            <li>موضوعی را انتخاب کنید که به آن علاقه و اشتیاق دارید.</li>
            <li>
              برای انتخاب کتاب داستان مورد نظر زمان بگذارید و از نظرات
              رمان‌خوان‌های حرفه‌ای، برای انتخاب رمان مناسب استفاده کنید
              <span dir="LTR">.</span> هم چنین بهتر است از کتابهایی که عموم مردم
              از آن استقبال کرده اند، شروع کنید.
            </li>
            <li>
              هدفتان از خواندن را نه برای یادگیری و فهم پیامی خاص، که برای لذت
              بردن انتخاب کنید<span dir="LTR">.</span>
            </li>
            <li>
              چنانچه در ابتدای راه رمان خواندن هستید، پیشنهاد می‌کنم از رمان‌های
              کلاسیک آغاز کنید<span dir="LTR">.</span>
            </li>
            <li>
              به خاطر طولانی بودن یک رمان، فهرست شخصیت‌های اصلی و فرعی و
              ارتباطات میان آنها و فهرستی از رویدادهای مهم را در داخل جلد کتاب
              یادداشت کنید<span dir="LTR">.</span>
            </li>
            <li>
              برداشت‌های خود را از شخصیت‌ها و حوادث در جملاتی کوتاه در حاشیه‌ی
              کتاب بنویسید<span dir="LTR">.</span>
            </li>
            <li>
              در پایان خواندن، برداشت کلی از رمان را در صفحه‌ای خالی از کتاب به
              صورت آزاد بنویسید. پس از گذشت چند سال مجموعه‌ای جالب و خواندنی از
              نوشته‌هایتان خواهید داشت<span dir="LTR">.</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      nameId: 'management',
      title: 'مدیریت ، رهبری و فروش',
      books: [
        {
          cover: '/images/books/64664_88543_normal.jpg',
          name: 'دنیای سوفی',
          writer: 'یوستین گردر',
          price: 30000,
        },
        {
          cover: '/images/books/85720_97025_normal.jpg',
          name: 'مغازه خودکشی',
          writer: 'ژان تولی',
          price: 49000,
        },
      ],
    },
    {
      nameId: 'children',
      title: 'کودکان',
      books: [
        {
          cover: '/images/books/927_86386_normal.jpg',
          name: 'چشمهایش',
          writer: 'بزرگ علوی',
          price: 189000,
        },
        {
          cover: '/images/books/927_86386_normal.jpg',
          name: 'چشمهایش',
          writer: 'بزرگ علوی',
          price: 189000,
        },
      ],
    },
    {
      nameId: 'feminism',
      title: 'زنان و فمینیسم',
      books: [
        {
          cover: '/images/books2/159426_99545_normal.jpg',
          name: 'جزوه کلاس کنکور ریاضی',
          writer: 'خسرو فیض آبادی',
          price: 75000,
        },
        {
          cover: '/images/books2/159426_99545_normal.jpg',
          name: 'جزوه کلاس کنکور ریاضی',
          writer: 'خسرو فیض آبادی',
          price: 75000,
        },
      ],
    },
    {
      nameId: 'economy',
      title: 'اقتصاد',
      books: [
        {
          cover: '/images/books2/159268_51582_normal.jpg',
          name: 'کتاب کار فارسی دوم دبستان',
          writer: 'مریم پورکلهر',
          price: 25000,
        },
        {
          cover: '/images/books2/159269_58634_normal.jpg',
          name: 'روان‌خوانی اول دبستان',
          writer: 'زهرا عبدلی',
          price: 12000,
        },
      ],
    },
    {
      nameId: 'law',
      title: 'حقوق',
      books: [
        {
          cover: '/images/books2/159269_58634_normal.jpg',
          name: 'روان‌خوانی اول دبستان',
          writer: 'زهرا عبدلی',
          price: 12000,
        },
        {
          cover: '/images/books2/159250_18834_normal.jpg',
          name: 'تست های مفهومی ادبیات',
          writer: 'مجید علی‌نوری',
          price: 52000,
        },
        {
          cover: '/images/books2/159269_58634_normal.jpg',
          name: 'روان‌خوانی اول دبستان',
          writer: 'زهرا عبدلی',
          price: 12000,
        },
        {
          cover: '/images/books2/159250_18834_normal.jpg',
          name: 'تست های مفهومی ادبیات',
          writer: 'مجید علی‌نوری',
          price: 52000,
        },
      ],
    },
    {
      nameId: 'life-style',
      title: 'سبک زندگی',
      books: [
        {
          cover: '/images/books2/159269_58634_normal.jpg',
          name: 'روان‌خوانی اول دبستان',
          writer: 'زهرا عبدلی',
          price: 12000,
        },
        {
          cover: '/images/books2/159250_18834_normal.jpg',
          name: 'تست های مفهومی ادبیات',
          writer: 'مجید علی‌نوری',
          price: 52000,
        },
        {
          cover: '/images/books2/158786_12364_normal.jpg',
          name: 'کتاب فارسی اول ابتدایی',
          writer: 'سمانه مشایخی',
          price: 10000,
        },
      ],
    },
    {
      nameId: 'history',
      title: 'تاریخ',
      books: [
        {
          cover: '/images/books2/158780_81939_normal.jpg',
          name: 'تست های مفهومی زیست',
          writer: 'مجید علی‌نوری',
          price: 98000,
        },
        {
          cover: '/images/books2/159250_18834_normal.jpg',
          name: 'تست های مفهومی ادبیات',
          writer: 'مجید علی‌نوری',
          price: 52000,
        },
        {
          cover: '/images/books2/158786_12364_normal.jpg',
          name: 'کتاب فارسی اول ابتدایی',
          writer: 'سمانه مشایخی',
          price: 10000,
        },
      ],
    },
    {
      nameId: 'free-books',
      title: 'کتاب های رایگان',
      books: [
        {
          cover: '/images/books2/159268_51582_normal.jpg',
          name: 'کتاب کار فارسی دوم دبستان',
          writer: 'مریم پورکلهر',
          price: 25000,
        },
        {
          cover: '/images/books2/159269_58634_normal.jpg',
          name: 'روان‌خوانی اول دبستان',
          writer: 'زهرا عبدلی',
          price: 12000,
        },
        {
          cover: '/images/books2/158786_12364_normal.jpg',
          name: 'کتاب فارسی اول ابتدایی',
          writer: 'سمانه مشایخی',
          price: 10000,
        },
      ],
    },
    {
      nameId: 'teenagers',
      title: 'نوجوان',
      books: [
        {
          cover: '/images/books2/159268_51582_normal.jpg',
          name: 'کتاب کار فارسی دوم دبستان',
          writer: 'مریم پورکلهر',
          price: 25000,
        },
        {
          cover: '/images/books/4268_73746_normal.jpg',
          name: 'مردی به نام او',
          writer: 'فدریک بکمن',
          price: 120000,
        },
        {
          cover: '/images/books/62882_79534_normal.jpg',
          name: 'شب های روشن',
          writer: 'داستایفسکی',
          price: 90000,
        },
        {
          cover: '/images/books2/158786_12364_normal.jpg',
          name: 'کتاب فارسی اول ابتدایی',
          writer: 'سمانه مشایخی',
          price: 10000,
        },
      ],
    },
    {
      nameId: 'english',
      title: 'کتاب های انگلیسی',
      books: [
        {
          cover: '/images/books/62882_79534_normal.jpg',
          name: 'شب های روشن',
          writer: 'داستایفسکی',
          price: 90000,
        },
        {
          cover: '/images/books/63281_53977_normal.jpg',
          name: 'وقتی نیچه گریست',
          writer: 'اروین یالوم',
          price: 115000,
        },
        {
          cover: '/images/books/64664_88543_normal.jpg',
          name: 'دنیای سوفی',
          writer: 'یوستین گردر',
          price: 30000,
        },
        {
          cover: '/images/books/85720_97025_normal.jpg',
          name: 'مغازه خودکشی',
          writer: 'ژان تولی',
          price: 49000,
        },
      ],
    },
    {
      nameId: 'psychology',
      title: 'روانشناسی',
      books: [
        {
          cover: '/images/books/85720_97025_normal.jpg',
          name: 'مغازه خودکشی',
          writer: 'ژان تولی',
          price: 49000,
        },
        {
          cover: '/images/books/927_86386_normal.jpg',
          name: 'چشمهایش',
          writer: 'بزرگ علوی',
          price: 189000,
        },
        {
          cover: '/images/books2/158786_12364_normal.jpg',
          name: 'کتاب فارسی اول ابتدایی',
          writer: 'سمانه مشایخی',
          price: 10000,
        },
      ],
    },
    {
      nameId: 'art',
      title: 'هنر',
      books: [
        {
          cover: '/images/books/62882_79534_normal.jpg',
          name: 'شب های روشن',
          writer: 'داستایفسکی',
          price: 90000,
        },
      ],
    },
    {
      nameId: 'philosoghy',
      title: 'فلسفه',
      books: [
        {
          cover: '/images/books/4268_73746_normal.jpg',
          name: 'مردی به نام او',
          writer: 'فدریک بکمن',
          price: 120000,
        },
        {
          cover: '/images/books/62882_79534_normal.jpg',
          name: 'شب های روشن',
          writer: 'داستایفسکی',
          price: 90000,
        },
        {
          cover: '/images/books/85720_97025_normal.jpg',
          name: 'مغازه خودکشی',
          writer: 'ژان تولی',
          price: 49000,
        },
        {
          cover: '/images/books/927_86386_normal.jpg',
          name: 'چشمهایش',
          writer: 'بزرگ علوی',
          price: 189000,
        },
      ],
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      let filteredBooksCategory = categories.find(
        (category) => category.nameId == categoryName,
      )
      setCurrentCategory(filteredBooksCategory)
      setCurrentBooks(filteredBooksCategory.books)
    }, 1000)
  }, [categoryName])

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

    let bookName = name

    const allBooks = [
      {
        cover: '/images/books/4268_73746_normal.jpg',
        name: 'مردی به نام او',
        writer: 'فدریک بکمن',
        price: 120000,
      },
      {
        cover: '/images/books/62882_79534_normal.jpg',
        name: 'شب های روشن',
        writer: 'داستایفسکی',
        price: 90000,
      },
      {
        cover: '/images/books/63281_53977_normal.jpg',
        name: 'وقتی نیچه گریست',
        writer: 'اروین یالوم',
        price: 115000,
      },
      {
        cover: '/images/books/64664_88543_normal.jpg',
        name: 'دنیای سوفی',
        writer: 'یوستین گردر',
        price: 30000,
      },
      {
        cover: '/images/books/85720_97025_normal.jpg',
        name: 'مغازه خودکشی',
        writer: 'ژان تولی',
        price: 49000,
      },
      {
        cover: '/images/books/927_86386_normal.jpg',
        name: 'چشمهایش',
        writer: 'بزرگ علوی',
        price: 189000,
      },
      {
        cover: 'images/books2/159426_99545_normal.jpg',
        name: 'جزوه کلاس کنکور ریاضی',
        writer: 'خسرو فیض آبادی',
        price: 75000,
      },
      {
        cover: 'images/books2/159268_51582_normal.jpg',
        name: 'کتاب کار فارسی دوم دبستان',
        writer: 'مریم پورکلهر',
        price: 25000,
      },
      {
        cover: 'images/books2/159269_58634_normal.jpg',
        name: 'روان‌خوانی اول دبستان',
        writer: 'زهرا عبدلی',
        price: 12000,
      },
      {
        cover: 'images/books2/159250_18834_normal.jpg',
        name: 'تست های مفهومی ادبیات',
        writer: 'مجید علی‌نوری',
        price: 52000,
      },
      {
        cover: 'images/books2/158786_12364_normal.jpg',
        name: 'کتاب فارسی اول ابتدایی',
        writer: 'سمانه مشایخی',
        price: 10000,
      },
      {
        cover: 'images/books2/158780_81939_normal.jpg',
        name: 'تست های مفهومی زیست',
        writer: 'مجید علی‌نوری',
        price: 98000,
      },
    ]

    let filteredBookByName = allBooks.filter((book) => book.name === bookName)
    let cartTemp = allCartItems
    cartTemp.push(filteredBookByName[0])
    setAllCartItems(cartTemp)

    console.log(allCartItems)

    let jsonString = JSON.stringify(allCartItems)

    localStorage.setItem('cartItems', jsonString)
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Header />
        <div className="direction-rtl my-8 w-full lg:w-[1140px] mx-auto">
          {currentCategory === true ? currentCategory.desc : ''}
          {currentCategory ? (
            <div className="text-2xl mb-10 text-slate-500">
              {currentCategory.title}
            </div>
          ) : (
            <div className="text-gray-500 text-lg mb-10">
              دسته بندی مورد نظر یافت نشد
            </div>
          )}
          <div className="flex flex-row flex-wrap gap-5">
            {currentCategory ? (
              currentBooks.map((book) => (
                <div className="w-[170px]">
                  <ProductSlide
                    key={book.index}
                    onAdd={addToCart}
                    cover={book.cover}
                    name={book.name}
                    writer={book.writer}
                    price={book.price}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-md mb-10">
                محصولی برای نمایش وجود ندارد
              </div>
            )}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </React.Fragment>
  )
}
