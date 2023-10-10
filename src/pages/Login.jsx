import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import Swal from 'sweetalert2'

export default function Login() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const registerUser = (event) => {
    event.preventDefault()

    const isValidEmail = (email) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    }

    // Validation logic
    const validationErrors = {}

    if (formData.email.trim() === '') {
      validationErrors.emailRequired = 'مقدار ایمیل ضروری است'
    } else if (!isValidEmail(formData.email)) {
      validationErrors.emailValidation = 'لطفا یک ایمیل معتبر وارد کنید'
    }

    if (formData.password.trim() === '') {
      validationErrors.passwordRequired = 'مقدار رمزعبور ضروری است'
    } else if (
      formData.password.trim().length < 8 ||
      formData.password.trim().length > 32
    ) {
      validationErrors.passwordCharacterRule =
        'مقدار رمزعبور باید بین ۸ تا ۳۲ کاراکتر باشد'
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setErrors({})
      const userFromData = {
        email: formData.email,
        password: formData.password,
      }

      fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFromData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            console.log(result)
            authContext.login(result.data.user, result.data.token)
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'ورود با موفقیت انجام شد',
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              navigate('/')
            })
          } else if (result.error) {
            const errorText = result.message
            Swal.fire({
              position: 'top-center',
              icon: 'error',
              title: errorText,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'تلاش مجدد',
              timer: 2000,
            })
          }
        })
    }
  }

  return (
    <React.Fragment>
      <div className="w-screen h-screen bg-cyan-500 flex justify-center items-center">
        <div className="p-4 w-[400px] bg-slate-50 shadow-custom rounded-lg py-4">
          <form className="direction-rtl">
            <h2 className="text-gray-500 text-md text-center mb-4 font-medium">
              ورود به کتابینو
            </h2>
            <div className="w-full">
              <label htmlFor="email" className="text-gray-500 text-[14px]">
                ایمیل
              </label>
              <input
                value={formData.email}
                onChange={handleChange}
                className="outline-0 text-[14px] border-2 border-gray-300 rounded-md mt-1 bg-slate-50 p-3 w-full"
                type="email"
                id="email"
                name="email"
                placeholder="ایمیل خود را وارد کنید"
              />
            </div>
            <div className="form-error w-full">
              <ul>
                <li>
                  <span>{errors.emailRequired}</span>
                </li>
                <li>
                  <span>{errors.emailValidation}</span>
                </li>
              </ul>
            </div>
            <div className="w-full mt-2">
              <label htmlFor="password" className="text-gray-500 text-[14px]">
                رمزعبور
              </label>
              <input
                value={formData.password}
                onChange={handleChange}
                className="outline-0 text-[14px] border-2 border-gray-300 rounded-md mt-1 bg-slate-50 p-3 w-full"
                type="password"
                id="password"
                name="password"
                placeholder="رمزعبور خود را وارد کنید"
              />
            </div>
            <div className="form-error p-2 w-full">
              <ul>
                <li>
                  <span>{errors.passwordRequired}</span>
                </li>
                <li>
                  <span>{errors.passwordCharacterRule}</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 text-center">
              <button
                onClick={(event) => {
                  registerUser(event)
                }}
                className="bg-green-500 rounded-md text-white p-2 px-6"
              >
                ورود
              </button>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-700">
                هنوز ثبت‌نام نکردی؟{' '}
                <Link className="text-cyan-600 cursor-pointer" to="/register">
                  ثبت‌نام در کتابینو
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
