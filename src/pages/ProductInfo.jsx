import React, { useState } from 'react'
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
import { useParams } from 'react-router-dom'
import useGetOneBook from '../services/public/books/getOneBook'

export default function ProductInfo() {
  const [relatedBooks, setRelatedBooks] = useState([])
  const [currentWriterBooks, setCurrentWriterBooks] = useState([])

  const [tabValue, setTabValue] = useState('1')
  const [isBookmarked, setBookmarked] = useState(false)
  // const [bookInfo, setBookInfo] = useState({})
  const [showMore, setShowMore] = useState(false)

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

  const persian = new Intl.NumberFormat('fa')

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleBookmark = () => {
    setBookmarked(!isBookmarked)
  }

  const handleShowMore = () => {
    setShowMore(!showMore)
  }
  const params = useParams()
  const { data: bookInfos, isLoading } = useGetOneBook(params.productID)
  if (!isLoading) {
    console.log(bookInfos.data)
  }

  // setTimeout(() => {
  //   setBookInfo({
  //     name: 'چگونه کمال‌گرا نباشیم؟',
  //     writer: 'استفان گایز',
  //     translator: 'نرگس محمدی',
  //     productDetails: {
  //       size: 'رقعی',
  //       weight: 345,
  //       printYear: 1399,
  //       coverMaterial: 'شومیز',
  //       pubCount: 12,
  //       pagesCount: 208,
  //     },
  //     comments: [
  //       {
  //         username: 'علی غلامی',
  //         role: 'USER',
  //         date: '1 اردبیهشت ۱۴۰۱',
  //         isAnswer: false,
  //         text: 'خیلی کتاب خوبی بود ازش لذت بردم به همه پیشنهاد میدمش',
  //       },
  //       {
  //         username: 'زهرا شیرانی',
  //         role: 'USER',
  //         date: '۵ شهریور ۱۴۰۱',
  //         isAnswer: false,
  //         text: 'کاش نقد و بررسی کتاب هم قرار میدادین',
  //       },
  //       {
  //         username: 'علی',
  //         role: 'ADMIN',
  //         date: '۶ شهریور ۱۴۰۱',
  //         isAnswer: true,
  //         text: 'ممنون از پیشنهادتون. سعی میکنیم این کار رو انجام بدیم',
  //       },
  //       {
  //         username: 'محمدرضا عسگری',
  //         role: 'USER',
  //         date: '۳۱ مهر ۱۴۰۱',
  //         isAnswer: false,
  //         text: 'سلام. من سفارش دادم از کجا باید پیگیری کنم؟',
  //       },
  //       {
  //         username: 'علی',
  //         role: 'ADMIN',
  //         date: '۱ آبان ۱۴۰۱',
  //         isAnswer: true,
  //         text: 'سلام. از قسمت پنل کاربری و پیگیری سفارشات',
  //       },
  //     ],
  //     tags: ['خودیاری', 'روانشناسی', 'موفقیت'],
  //     cover: ['/images/product/1.jpg', '/images/product/2.jpg'],
  //     price: { epub: 35000, ppub: 110000 },
  //     pub: 'شمشاد',
  //     aboutWriter: `استفان گایز نویسنده، وبلاگ‌نویس و کارآفرین بین‌المللی است که
  //     کتاب‌های پرطرفدارش تاکنون به ۲۱ زبان ترجمه شده‌اند. گایز شهرتش
  //     را به واسطه‌ی ارائه‌ی استراتژی‌های کاربردی و طنزآمیز تغییر رفتار
  //     در سطح جهانی به دست آورده است. او اکنون در نزدیکی دنیای دیزنی،
  //     در اورلاندوی فلوریدا زندگی می‌کند. تعدادی از کتاب‌های او تاکنون
  //     به زبان فارسی نیز ترجمه شده‌اند. گایز نویسنده‌ی کتاب‌های مشهوری
  //     از جمله خرده‌عادت‌ها (۲۰۱۶)، چگونه کمال‌گرا نباشیم (۲۰۱۵) و
  //     عادت‌های انعطاف‌پذیر (۲۰۱۹) است. گایز در کتاب چگونه کمال‌گرا
  //     نباشیم، توضیح می‌دهد که کمال‌گرایی یک ذهنیت محدودکننده است. به
  //     عنوان مثال، به کودکان آموزش داده می‌شود که داخل خطوط رنگ‌آمیزی
  //     کنند و مراقب باشند که رنگ‌هایشان از خطوط بیرون نزند.
  //     ناکامل‌گرایی ما را آزاد می‌کند تا خارج از خطوط زندگی کنیم، جایی
  //     که احتمالات بی‌نهایت و اشتباهات مجاز هستند و خودقضاوتی به حداقل
  //     خواهد رسید. در حالی که رهایی از کمال‌گرایی تاثیرگذار است، با این
  //     حال نمی‌تواند مانع از به وجود آمدن تمام مشکلات شود. افراد ناکامل
  //     زندگی بدون نقصی ندارند؛ آن‌ها فقط شادتر، سالم‌تر و در حال انجام
  //     کارهای مهم‌تری هستند. گایز در کتاب خرده‌عادت‌ها، توضیح می‌دهد که
  //     چطور یک روز بعد از ظهر -پس از یک تلاش ناموفق دیگر برای ایجاد
  //     انگیزه‌ی ورزش- به طور تصادفی اولین خرده‌عادت خود را شروع کرده
  //     است. او در ابتدا متعهد شد که تنها یک حرکت شنا انجام دهد و همین
  //     حرکت، به یک تمرین کامل تبدیل شد. او در ابتدا تصور می‌کرد که این
  //     ایده‌ی احمقانه، کار نخواهد کرد، اما زمانی که موفقیت او با همین
  //     استراتژی ماه‌ها (و تاکنون) ادامه یافت، شوکه شد. او در این کتاب،
  //     به خوانندگان توصیه می‌کند که می‌توانند بدون احساس گناه، ارعاب و
  //     شکست مکرر، مرتبط با استراتژی‌هایی مانند انگیزه گرفتن، تصمیمات
  //     جدید برای سال نو یا حتی فقط انجام یک کار کوچک، موفق شوند. افراد
  //     تنها زمانی که با قوانین مغز خود شروع به بازی کنند و محدودیت‌های
  //     انسانی خود را جدی بگیرند -همانطور که خرده‌عادت‌ها نشان می‌دهد
  //     این کار چگونه باید انجام شود- می‌توانند به تغییرات پایدار و مفید
  //     دست بایند. استفان گایز همچنین در کتاب عادت‌های انعطاف‌پذیر،
  //     توضیح می‌دهد که هیچ دو روزی شبیه به هم نیستند. ما با انعطاف‌پذیر
  //     کردن عادات خود، می‌توانیم کنترل هرروزه‌ی زندگی منحصربه‌فرد خود
  //     را در دست بگیریم. اگرچه همچنان از اتفاقات جنون‌آمیز زندگی
  //     شگفت‌زده خواهیم شد، اما با انعطاف‌پذیر کردن عادت‌های خود، دیگر
  //     برای آن‌ها ناآماده نخواهیم بود. عادت‌های انعطاف‌پذیر برای هر
  //     موقعیتی پاسخی خواهند داشت و بهانه‌ها را به طور طبیعی از بین
  //     خواهند برد. گایز ادعا می‌کند که اگر عادات معمولی را یک چکش در
  //     نظر بگیریم، عادت‌های انعطاف‌پذیر گاراژ پدربزرگمان خواهند بود،
  //     مکانی جادویی با ابزاری برای هر نیاز. در این کتاب، خواننده یک
  //     چارچوب جامع برای ایجاد عادت‌های انعطاف‌پذیر پیدا خواهد کرد. مواد
  //     انعطاف‌پذیر، قوی‌تر از مواد سفت و شکننده هستند، زیرا می‌توانند
  //     با فشار سازگار شوند. همین امر در مورد عادات نیز صادق می‌کند. با
  //     خواندن این کتاب، هر ترس یا احساس یکنواختی که در مورد شکل‌گیری
  //     عادات خود احساس کرده‌اید از بین خواهد رفت، زیرا این سازوکار پویا
  //     و هیجان‌انگیز است.`,
  //     shortDesc: (
  //       <div>
  //         <h2 className="text-[20px] my-4 text-gray-700">
  //           معرفی کتاب چگونه کمال‌گرا نباشیم؟
  //         </h2>
  //         <p className="text-slate-500 leading-8 mb-3">
  //           کتاب چگونه کمال گرا نباشیم؟ اثر استفان گایز نویسنده کتاب معروف
  //           خرده‌عادت ها، راهی جدید به سوی خودباوری، زندگی بدون ترس و رهایی از
  //           کمال‌گرایی به شما نشان می‌دهد.
  //         </p>
  //         <h2 className="text-[20px] my-4 text-gray-700">
  //           درباره کتاب چگونه کمال‌گرا نباشیم؟
  //         </h2>
  //         <p className="text-slate-500 leading-8 mb-3">
  //           شاید فکرکنید کمال‌گرا بودن صفت خیلی خوبی است ولی واقعیت این است که
  //           این صفت می تواند آسیب‌های جدی به شما بزند. اما کمال‌گرایی چیست و
  //           چگونه در انسان ایجاد می‌شود؟ از سال‌های ابتدایی زندگی یک کودک، به او
  //           گفته می شود که داخل خطوط رنگ‌آمیزی کند و اگر از خط بیرون بزند، به او
  //           می‌گوییم که نقاشی‌اش غیرقابل قبول است. این همان کمال‌گرایی و همان
  //           طرز فکر محدود کننده است. برخلاف آن، معمول‌گرایی به ما اجازه می‌دهد
  //           که بیرون از خطوط و حدوحدود از پیش تعیین شده، رنگ‌آمیزی کنیم، آن جا
  //           که موقعیت‌های رسیدن به موفقیت بی‌شمار است، اشتباهات مجازند و قضاوت
  //           در مورد خود، به حداقل می‌رسد. کمال‌گرایی، در دنیایی پر از
  //           ناکاملی‌ها، همچون تله‌ای است که انسان را گرفتار توهم برتر بودن کرده
  //           و او را از قدمی به جلو برداشتن، باز می‌دارد. شاید فکر کنید ایده‌ای
  //           آرمانی است، اما فقط فکری بازدارنده است. فکر برتر بودن و در حد کمال
  //           بودن، آن چنان ذهنتان را اسیر خود می‌کند که از ترس آن که نتوانید آنچه
  //           در ذهن دارید را در حد کمال اجرا کنید، حتی قدمی هم در آن مسیر بر
  //           نمی‌دارید. این طرز فکر، همان مانعی است که نویسندهٔ این کتاب و یا
  //           بسیاری از افراد را برای سال‌ها در یک نقطه نگاه داشته است. تصویر زیر
  //           کاریکاتوری از مجله نیویورکر است که به خوبی بلایی که کمال‌گرایی بر سر
  //           آدم می‌آورد، نشان می‌دهد!
  //         </p>
  //         <img src="/images/product-desc/1.jpg" />
  //         <p className="text-slate-500 leading-8 mb-3">
  //           استفان گایز، نویسندهٔ کتاب چگونه کمال‌گرا نباشیم؟ چگونه کمال‌گرا
  //           نباشیم؟ چگونه کمال‌گرا نباشیم؟ ، از مسیری که برای مقابله با کمال
  //           گرایی طی کرده می‌گوید و تجربیات خود را با ما به اشتراک می‌گذارد. همه
  //           چیز برای گایز از آن‌جا شروع شد که هدف بزرگ انجام ۵۰ حرکت شنای روی
  //           زمین را از ذهن خود پاک کرده و تصمیم گرفت به جای برداشتن لقمه‌ای
  //           فوق‌العاده بزرگ، آن را به چندین لقمه کوچک‌تر و قابل هضم‌تر تقسیم
  //           کند. به جای آن که هر روز تمریناتش را به شرایط ایده آل رفتن به
  //           باشگاه، پوشیدن لباس ورزشی و داشتن بهترین شرایط روحی و جسمی محدود
  //           کند، همان‌جا روی تختخواب، بدون هیچ پیش شرط ذهنی و ایده‌ای آرمانی،
  //           شروع به انجام حرکت شنای روی زمین می کند و فقط تصمیم می گیرد به جای
  //           خیال پردازی و ترتیب دادن شرایطی در حد کمال، بسیار ساده و هر کجا که
  //           هست، فقط شروع به انجام کار و یا تمرین کند و فقط شروع کند! با استمرار
  //           این حرکت و جایگزین کردن ایده «معمولی بودن» و «در شرایط معمولی کاری
  //           را انجام دادن» با «در حد کمال بودن» و «در شرایط حد کمال کاری را
  //           انجام دادن»، شاهد پیشرفت‌های بسیاری در زندگی‌اش بود. پس از آنکه
  //           متوجه شد مشکل متوقف ماندن، از طرز فکر خودش ریشه گرفته بود، تصمیم
  //           گرفت ایده طلایی «معمولی بودن» را به دیگران منتقل کند و راهکارهای
  //           عملی خود را با تمام کسانی که با چنین طرز فکر محدود کننده‌ای دست و
  //           پنجه نرم می‌کنند، به اشتراک بگذارد. می‌توان گفت، گایز چاره «مشکل
  //           کمال‌گرایی» را در به‌کارگیری راهکار «خرده‌عادت‌ها» می‌داند. تفاوت
  //           راهکارهای او با دیگر راهکارهایی که این روزها توسط نویسندگان و
  //           سخنرانان دیگر ارائه می شود این است که او عمل کردن را راه رسیدن به
  //           هدف می‌داند و نه با انگیزه شدن را! سال‌هاست که در مورد راهکارهای
  //           انگیزشی بسیار شنیده ایم اما مشکل اینجاست که چطور خود را با انگیزه
  //           کنیم؟ و آیا می‌توان برای رسیدن به هدفی بلند مدت، هر روز در پی
  //           جرقه‌ای احساسی و انگیزشی باشیم تا خود را تشویق به انجام کاری کنیم؟
  //           استفان گایز از شما می‌خواهد که برای قدمی برداشتن منتظر انگیزه
  //           نباشید. فقط از جای خود برخیزید و کاری را شروع کنید. کتاب چگونه
  //           کمال‌گرا نباشیم؟ به تک تک دغدغه ها و موانع فکری یک کمال گرا
  //           می‌پردازد و برای هر کدام، چندین راه‌حل آسان و عملی ارائه می دهد؛
  //           انتظارات غیرواقعی، نشخوار ذهنی، نیاز به تایید شدن، نگرانی از ارتکاب
  //           اشتباه و غیره، از جمله محدودیت‌های ذهن یک کمال‌گرا است. اینکه بدانید
  //           مشکل‌تان، کمال‌گرایی است و نگرش‌تان را نسبت به نحوهٔ انجام کارها
  //           تغییر بدهید (طرز فکر دوگانه به جای قیاسی)، همان راه‌حل کلیدی است که
  //           نگرانی از ارتکاب اشتباه را در وجودتان از بین می‌برد. با راهکار تنظیم
  //           معیارها، می‌توانید اعتماد به نفس تان را بالا ببرید و با انجام حرکت
  //           شورشی، نیاز به تایید را در وجودتان می‌کشید تا راه زندگی خود را
  //           آنگونه که خاص خودتان است، برگزینید و لذت دستیابی به موفقیت با
  //           برداشتن گام‌هایی آهسته اما پیوسته را فدای ایدهٔ پوچ کمال گرایی
  //           نکنید. استفان گایز در ۹ فصل اول با جزئیات کامل به مفاهیم می‌پردازد
  //           تا بتوانیم آن‌ها را بفهمیم و در فصل آخر، تمام راه‌حل‌های عملی و
  //           کاربردی را جمع بندی، طبقه بندی و خلاصه می‌کند. همین باعث می‌شود
  //           بتوان به سرعت به کتاب مراجعه کرد. کتاب چگونه کمال‌گرا نباشیم؟ مورد
  //           توجه و تحسین منتقدان و کاربران گودریدز و روزنامه‌ها و مجلات زیادی
  //           بوده است.
  //         </p>
  //         <h2 className="text-[20px] my-4 text-gray-700">
  //           خواندن کتاب چگونه کمال‌گرا نباشیم؟ را به چه کسانی پیشنهاد می‌کنیم
  //         </h2>
  //         <p className="text-slate-500 leading-8 mb-3">
  //           اگر فکر می‌کنید شما هم به مشکل کمال‌گرایی دچار هستید و این مشکل جلوی
  //           پیشرفتتان را گرفته است، حتما این کتاب کاربردی را بخوانید. و به
  //           توصیه‌هایش عمل کنید.
  //         </p>
  //         <h2 className="text-[20px] my-4 text-gray-700">درباره استفان گایز</h2>
  //         <p className="text-slate-500 leading-8 mb-3">
  //           استفان‌گایز، بلاگر، نویسنده و کارافرین بین المللی است که کتاب خرده
  //           عادت‌هایش از پرفروش‌های دنیای موفقیت بوده و مدت ها در لیست پرفروش
  //           های آمازون و نیویورک تایمز قرار داشته است. کتاب‌های گایز تاکنون به
  //           ۱۸ زبان دنیا ترجمه شده‌اند. او نزدیک دیزنی‌لند زندگی می‌کند.
  //         </p>
  //         <h2 className="text-[20px] my-4 text-gray-700">
  //           بخشی از کتاب چگونه کمال‌گرا نباشیم؟
  //         </h2>
  //         <p className="text-slate-500 leading-8 mb-3">
  //           تا به حال دیده‌اید که کسی در کاری شکست بخورد و بلافاصله بهانه‌هایی
  //           را که از قبل برای دلیل باختش آماده کرده است، رو کند؟ من قبلاً این
  //           کار را کرده‌ام. اصطلاحی به نام «خودناتوان‌سازی» وجود دارد که توضیح
  //           می‌دهد چگونه افراد با اراده خود به صورت آشکار و یا ذهنی – اقدام به
  //           ناتوان‌سازی خود می‌کنند تا اگر موفق نشدند، بهانه‌ای در دست داشته
  //           باشند. اگر آشکارا اینچنین کنید، احتمالاً می‌خواهید در یک مسابقه،
  //           فرجه‌ای به کسی بدهید زیرا اگر فرصتی به کسی بدهیم و او ببرد،
  //           می‌توانید بگویید به این دلیل است که او اول شروع کرد و اگر به لحاظ
  //           روانی به کسی فرجه‌ای دهیم، ممکن است مسابقه را از همان نقطه آغاز
  //           کنید، به جای اینکه بگویید: «این مسابقه را خواهم برد»، در ذهن خود
  //           اینطور فکر خواهید کرد که: «زانویم آسیب دیده و خسته‌ام.» ما این چنین
  //           حس می‌کنیم تا از خودمان محافظت کنیم. خوب هم به نظر می‌رسد که فرصت
  //           برد داشته باشیم اما اگر تلاش‌مان نتیجه نداد، بگوییم: «خُب ... زانویم
  //           درد داشت». اگر بخواهیم تمام عواقب کاری را بپذیریم، ریسک بالاتری
  //           دارد. خودناتوان‌سازی از این جهت که به فرد امکان می‌دهد ستاره‌ای در
  //           کنار شکست‌هایش بگذارد، یکی از خصوصیات کمال‌گرایی محسوب می‌شود. اما
  //           مانعی برای شکست نیز هست، به جای آنکه بکوشد در بازی زندگی ببرد،
  //           می‌کوشد تا با احتیاط کامل بازی کند. تیم‌های فوتبال بی‌شماری را
  //           دیده‌ام در زمان یک چهارم آخر بازی، فقط به این دلیل که محتاطانه بازی
  //           کرده‌اند، اجازه داده‌اند که تیم مقابل حمله کند و در نتیجه بازی را
  //           باخته‌اند. قطعاً، بعضی تیم‌ها نیز با بازی محتاطانه برده‌اند. همان
  //           طور که بعضی افراد با «خودناتوان‌سازی» می‌برند اما اگر فقط یک بار
  //           تیمی را دیده باشید که حاضر نیست فرصتی را از دست بدهد، دیگر نخواهید
  //           گفت محتاطانه بازی کردن، بهترین راه است.
  //         </p>
  //       </div>
  //     ),
  //   })

  //   setCurrentWriterBooks([
  //     {
  //       cover: '/images/books/4268_73746_normal.jpg',
  //       name: 'مردی به نام او',
  //       writer: 'فدریک بکمن',
  //     },
  //     {
  //       cover: '/images/books/62882_79534_normal.jpg',
  //       name: 'شب های روشن',
  //       writer: 'داستایفسکی',
  //     },
  //     {
  //       cover: '/images/books/63281_53977_normal.jpg',
  //       name: 'وقتی نیچه گریست',
  //       writer: 'اروین یالوم',
  //     },
  //     {
  //       cover: '/images/books/64664_88543_normal.jpg',
  //       name: 'دنیای سوفی',
  //       writer: 'یوستین گردر',
  //     },
  //     {
  //       cover: '/images/books/85720_97025_normal.jpg',
  //       name: 'مغازه خودکشی',
  //       writer: 'ژان تولی',
  //     },
  //     {
  //       cover: '/images/books/927_86386_normal.jpg',
  //       name: 'چشمهایش',
  //       writer: 'بزرگ علوی',
  //     },
  //   ])
  //   setRelatedBooks([
  //     {
  //       cover: '/images/books2/159426_99545_normal.jpg',
  //       name: 'جزوه کلاس کنکور ریاضی',
  //       writer: 'خسرو فیض آبادی',
  //     },
  //     {
  //       cover: '/images/books2/159268_51582_normal.jpg',
  //       name: 'کتاب کار فارسی دوم دبستان',
  //       writer: 'مریم پورکلهر',
  //     },
  //     {
  //       cover: '/images/books2/159269_58634_normal.jpg',
  //       name: 'روان‌خوانی اول دبستان',
  //       writer: 'زهرا عبدلی',
  //     },
  //     {
  //       cover: '/images/books2/159250_18834_normal.jpg',
  //       name: 'تست های مفهومی ادبیات',
  //       writer: 'مجید علی‌نوری',
  //     },
  //     {
  //       cover: '/images/books2/158786_12364_normal.jpg',
  //       name: 'کتاب فارسی اول ابتدایی',
  //       writer: 'سمانه مشایخی',
  //     },
  //     {
  //       cover: '/images/books2/158780_81939_normal.jpg',
  //       name: 'تست های مفهومی زیست',
  //       writer: 'مجید علی‌نوری',
  //     },
  //   ])

  //   setBookName(bookInfo.name)
  //   setBookWriter(bookInfo.writer)
  //   setBookDetails(bookInfo.productDetails)
  //   setAboutWriter(bookInfo.aboutWriter)
  //   setBookTranslator(bookInfo.translator)
  //   setBookTags(bookInfo.tags)
  //   setBookCover(bookInfo.cover)
  //   setBookNPrice({
  //     epub: persian.format(bookInfo.price.epub).toLocaleString(),
  //     ppub: persian.format(bookInfo.price.ppub).toLocaleString(),
  //   })
  //   setBookPub(bookInfo.pub)
  //   setBookComments(bookInfo.comments)
  //   setHtmlTemplate(bookInfo.shortDesc)

  //   setIsLoading(false)
  // }, 1000)

  return (
    <React.Fragment>
      <Header />
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
                  <div className="text-center flex flex-row sm:flex-col md:flex-row gap-2 justify-center md:justify-between">
                    <button className="text-[12px] md:text-sm hover:bg-slate-300 transition duration-200 bg-slate-200 text-gray-600 py-2 px-5 rounded-lg">
                      هدیه کتاب به دیگران
                    </button>
                    <button className="text-[12px] md:text-sm hover:bg-teal-600 transition duration-200 bg-teal-500 p-[10px] md:py-2 lg:px-5 text-white rounded-lg">
                      خرید و مطالعه کتاب
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
                  <div className="text-center flex flex-row sm:flex-col md:flex-row gap-2 justify-center md:justify-between">
                    <button className="text-[12px] md:text-sm hover:bg-slate-300 transition duration-200 bg-slate-200 text-gray-600 py-2 px-5 rounded-lg">
                      هدیه کتاب به دیگران
                    </button>
                    <button className="text-[12px] md:text-sm hover:bg-teal-600 transition duration-200 bg-teal-500 p-[10px] md:py-2 lg:px-5 text-white rounded-lg">
                      خرید و مطالعه کتاب
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
                        <a
                          href={`category/${category.url}`}
                          key={index}
                          className="py-[3px] rounded-md mr-1 text-[12px] text-white px-[6px] bg-teal-500"
                        >
                          {category.name}
                          {'‌'}
                        </a>
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
