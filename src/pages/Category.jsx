import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import ProductSlide from '../components/Product/ProductSlide'
import Swal from 'sweetalert2'
import useGetBooksByCategory from 'src/services/public/books/getByCategory'
import Skeleton from 'react-loading-skeleton'
import LoadingBar from 'react-top-loading-bar'

export default function Category() {
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()
  let { categoryName, subCategory } = useParams()
  const [rawBooks, setRawBooks] = useState([])
  const [currentCategory, setCurrentCategory] = useState({})
  const [currentBooks, setCurrentBooks] = useState([])
  const [allCartItems, setAllCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || [],
  )

  const categoryParam = subCategory
    ? `${categoryName}/${subCategory}`
    : `${categoryName}`
  const { data: books, isLoading } = useGetBooksByCategory(categoryParam)
  if (!isLoading) {
    console.log(books.data.data)
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

    let bookName = name

    let filteredBookByName = books.filter((book) => book.name === bookName)
    let cartTemp = allCartItems
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
          {!isLoading ? (
            books.data.data.map((book) => (
              <div className="w-[170px]">
                <ProductSlide
                  id={book.id}
                  key={book.index}
                  onAdd={addToCart}
                  cover={book.photo}
                  name={book.name}
                  writer={book.writer.name}
                  price={book.price}
                />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-md mb-10 flex flex-row">
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
              <div className="px-2">
                <Skeleton height={300} width={180} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}
