import React, {
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { BiTrash } from 'react-icons/bi'
import Skeleton from 'react-loading-skeleton'
import Swal from 'sweetalert2'
import UserCartContext from '../Context/UserCartContext'

export default function Cart() {
  const userCartContext = useContext(UserCartContext)

  const persian = new Intl.NumberFormat('fa')
  const booksInLocalStorage =
    JSON.parse(localStorage.getItem('cartItems')) || []

  const [buyedBooks, setBuyedBooks] = useState(booksInLocalStorage)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalDiscountPrice, setTotalDiscountPrice] = useState(0)
  const [discounts, setDiscounts] = useState([])
  const [enteredDiscount, setEnteredDiscount] = useState('')
  const [isDiscountOk, setIsDiscountOk] = useState(false)

  useEffect(() => {
    const total = buyedBooks
      .map((book) => book.price)
      .reduce((accumulator, currentPrice) => accumulator + currentPrice, 0)

    setTotalPrice(total)

    setIsLoading(false)
  }, [buyedBooks])

  useEffect(() => {
    console.log('useeffect 2')
    setTimeout(() => {
      setDiscounts([
        {
          name: 'norooz',
          value: 20,
        },
        {
          name: 'student',
          value: 40,
        },
        {
          name: 'سبحان الله',
          value: 100,
        },
      ])
    }, 0)
  }, [buyedBooks])

  const inputRef = useRef(null)

  const updateDiscount = useCallback(() => {
    let isDiscountOkLet = false
    const total = totalPrice
    discounts.map((discount) => {
      if (discount.name === enteredDiscount) {
        setTotalDiscountPrice((total * discount.value) / 100)
        setIsDiscountOk(true)
        isDiscountOkLet = true
      }
    })

    if (buyedBooks.length > 0) {
      if (isDiscountOkLet) {
        Swal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'کد تخفیف شما اعمال شد',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          position: 'top-center',
          icon: 'error',
          title: 'کد تخفیف وارد شده نامعتبر است',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    } else {
      setIsDiscountOk(false)
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'محصولی در سبد شما نیست',
        showConfirmButton: false,
        timer: 2000,
      })
    }

    const updatedPrice = total - totalDiscountPrice
    setTotalPriceUpdated(updatedPrice)
  })

  const deleteItemFromCart = useCallback((bookName) => {
    let arrayTemp = [...buyedBooks]
    const index = arrayTemp.findIndex((book) => book.name === bookName)
    if (index !== -1) {
      arrayTemp.splice(index, 1)
    }
    setBuyedBooks(arrayTemp)

    let jsonCartItems = JSON.stringify(arrayTemp)

    userCartContext.cart = arrayTemp

    localStorage.setItem('cartItems', jsonCartItems)
  })

  const getCountedProducts = useCallback(() => {
    const count = {}
    buyedBooks.forEach((book) => {
      const key = JSON.stringify(book) // Convert object to string for key

      if (count[key]) {
        count[key] += 1
      } else {
        count[key] = 1
      }
    })

    return count
  })

  return (
    <React.Fragment>
      <Header count={buyedBooks.length} />

      <div className="w-full lg:w-8/12 mx-auto p-6">
        {isLoading ? (
          <div className="flex flex-row-reverse">
            <div className="w-[10%]">
              <Skeleton height={150} />
            </div>
            <div className="details mr-6 w-[67%]">
              <div className="mb-3 mt-4 text-right text-lg text-gray-700">
                <Skeleton width={200} />
                <Skeleton width={120} />
              </div>
              <div className="text-sm text-right text-gray-600"></div>
            </div>
            <div className="cart-price w-[13%]">
              <div className="mt-8">
                <Skeleton width={100} />
              </div>
            </div>
            <div className="delete w-[7%]">
              <div className="delete mt-8 ml-5">
                <Skeleton width={100} count={2} />
              </div>
            </div>
          </div>
        ) : (
          <div className="buyed-books">
            <div className="books-count text-sm text-slate-600 direction-rtl text-right mb-4">
              <span>{buyedBooks.length}</span> مورد در سبد
            </div>
            {Object.entries(getCountedProducts()).map(([key, count]) => {
              const book = JSON.parse(key)
              return (
                <React.Fragment>
                  <div key={key} className="flex flex-row-reverse">
                    <img src={book.photo} className="w-[10%] rounded-md" />
                    <div className="details mr-6 w-[67%]">
                      <div className="mb-3 mt-4 text-right text-lg text-gray-700">
                        {book.name}
                      </div>
                      <div className="text-sm text-right text-gray-600">
                        {book.writer.name}
                      </div>
                    </div>
                    <div className="cart-price w-[13%]">
                      <div className="mt-8">
                        {count > 1 ? (
                          <div>
                            {persian
                              .format(book.price * count)
                              .toLocaleString()}{' '}
                            <span>تومان</span>{' '}
                            <div className="direction-rtl text-sm text-slate-500 text-left">
                              {count} عدد
                            </div>
                          </div>
                        ) : (
                          `${persian.format(book.price).toLocaleString()} تومان`
                        )}
                      </div>
                    </div>
                    <div className="delete w-[7%]">
                      <div className="delete mt-8 ml-5">
                        <BiTrash
                          className="text-xl text-red-400 cursor-pointer"
                          onClick={() => {
                            deleteItemFromCart(book.name)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                </React.Fragment>
              )
            })}
          </div>
        )}

        {/* discount section */}
        <div className="px-20 py-2">
          <div className="flex justify-around items-center bg-gray-100 p-5 rounded-lg direction-rtl">
            <span className="text-sm text-slate-500">
              اگر کد تخفیف دارید وارد کنید
            </span>
            <span>
              <input
                type="text"
                ref={inputRef}
                placeholder="کد تخفیف"
                className="border rounded-r-md p-3 outline-0"
                onChange={(e) => {
                  setEnteredDiscount(e.target.value)
                }}
              />
              <button
                className="bg-cyan-500 text-white p-3 rounded-l-md"
                onClick={() => {
                  updateDiscount()
                }}
              >
                اعمال کد
              </button>
              {isDiscountOk && (
                <button
                  className="bg-red-500 text-white p-2 text-sm mr-2 rounded-md"
                  onClick={() => {
                    setTotalDiscountPrice(0)
                    setIsDiscountOk(false)
                    setEnteredDiscount('')
                    inputRef.current.value = ''
                    inputRef.current.focus()
                  }}
                >
                  حذف کد تخفیف
                </button>
              )}
            </span>
          </div>
        </div>

        {/* purchase */}
        <div className="purchase-section mt-10 px-4">
          <div className="flex flex-row-reverse justify-between">
            <span className="text-gray-500">جمع کل</span>
            <span className="text-gray-500">
              {persian.format(totalPrice).toLocaleString()} تومان
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex flex-row-reverse justify-between">
            <span className="text-lg text-gray-600">تخفیف</span>
            <span className="text-lg text-gray-600">
              {persian.format(totalDiscountPrice).toLocaleString()} تومان
            </span>
          </div>
          <div className="flex flex-row-reverse justify-between mt-6">
            <span className="text-xl text-gray-800">قابل پرداخت</span>
            <span className="text-xl text-gray-800">
              {persian.format(totalPrice - totalDiscountPrice).toLocaleString()}{' '}
              تومان
            </span>
          </div>
          <hr className="my-4" />

          <div className="text-center">
            <button className="bg-cyan-500 text-white rounded-md px-20 py-3 text-lg">
              پرداخت نهایی
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  )
}
