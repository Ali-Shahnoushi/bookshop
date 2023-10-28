import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthContext from '../Context/AuthContext'
import useRegister from 'src/services/public/auth/register'

export default function Register() {
  const { mutate } = useRegister()
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  console.log(authContext)

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordRepeat: '',
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

    if (formData.firstname.trim() === '') {
      validationErrors.firstnameRequired = 'مقدار نام ضروری است'
    } else if (
      formData.firstname.trim().length < 3 ||
      formData.firstname.trim().length > 24
    ) {
      validationErrors.firstnameCharacterRule =
        'نام باید بین ۳ تا ۲۴ کاراکتر باشد'
    }
    if (formData.lastname.trim() === '') {
      validationErrors.lastnameRequired = 'مقدار نام‌خانوادگی ضروری است'
    } else if (
      formData.lastname.trim().length < 4 ||
      formData.lastname.trim().length > 24
    ) {
      validationErrors.lastnameCharacterRule =
        'نام خانوادگی باید بین ۴ تا ۲۴ کاراکتر باشد'
    }

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
    if (formData.passwordRepeat.trim() === '') {
      validationErrors.passwordRepeatRequired = 'مقدار رمزعبور مجدد ضروری است'
    } else if (
      formData.passwordRepeat.trim().length < 8 ||
      formData.passwordRepeat.trim().length > 32
    ) {
      validationErrors.passwordCharacterRule =
        'مقدار رمزعبور باید بین ۸ تا ۳۲ کاراکتر باشد'
    } else if (formData.passwordRepeat.trim() !== formData.password.trim()) {
      validationErrors.passwordValidation = 'مقدار رمزعبور وارد شده تطابق ندارد'
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setErrors({})
      const userFromData = {
        name: formData.firstname,
        lastname: formData.lastname,
        password: formData.password,
        password_confirmation: formData.passwordRepeat,
        email: formData.email,
      }

      mutate(userFromData, {
        onSuccess: (result) => {
          authContext.login(result.data.user, result.data.token)
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'ورود با موفقیت انجام شد',
            showConfirmButton: false,
            timer: 2000,
          })
          navigate('/')
        },
        onError: (result) => {
          const errorText = result.message
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: errorText,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'تلاش مجدد',
            timer: 2000,
          })
        },
      })
    }
  }

  return (
    <React.Fragment>
      <div className="w-screen h-screen bg-cyan-500 flex justify-center items-center">
        <div className="p-10 w-[700px] bg-slate-50 shadow-custom rounded-lg py-6">
          <form className="direction-rtl flex flex-col">
            <h2 className="w-full text-gray-500 text-md text-center mb-4 font-medium">
              ثبت‌نام در کتابینو
            </h2>
            <div className="flex flex-wrap">
              <div className="mb-2 w-1/2 pl-1">
                <label htmlFor="name" className="text-gray-500 text-[14px]">
                  نام
                </label>
                <input
                  value={formData.firstname}
                  onChange={handleChange}
                  className="outline-0 text-[14px] border-2 border-gray-300 rounded-md mt-1 bg-slate-50 p-3 w-full"
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              <div className="mb-2 w-1/2 pr-1">
                <label htmlFor="lastname" className="text-gray-500 text-[14px]">
                  نام خانوادگی
                </label>
                <input
                  value={formData.lastname}
                  onChange={handleChange}
                  className="outline-0 text-[14px] border-2 border-gray-300 rounded-md mt-1 bg-slate-50 p-3 w-full"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
              <div className="form-error p-2 w-full">
                <ul>
                  <li>
                    <span>{errors.firstnameRequired}</span>
                  </li>
                  <li>
                    <span>{errors.lastnameRequired}</span>
                  </li>
                  <li>
                    <span>{errors.firstnameCharacterRule}</span>
                  </li>
                  <li>
                    <span>{errors.lastnameCharacterRule}</span>
                  </li>
                </ul>
              </div>
              <div className="mb-2 w-full pl-1">
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
              <div className="form-error p-2 w-full">
                <ul>
                  <li>
                    <span>{errors.emailRequired}</span>
                  </li>
                  <li>
                    <span>{errors.emailValidation}</span>
                  </li>
                </ul>
              </div>
              <div className="w-1/2 pl-1">
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
              <div className="w-1/2 pr-1">
                <label
                  htmlFor="passwordRepeat"
                  className="text-gray-500 text-[14px]"
                >
                  تکرار رمزعبور
                </label>
                <input
                  value={formData.passwordRepeat}
                  onChange={handleChange}
                  className="outline-0 text-[14px] border-2 border-gray-300 rounded-md mt-1 bg-slate-50 p-3 w-full"
                  type="password"
                  id="passwordRepeat"
                  name="passwordRepeat"
                  placeholder="رمزعبور خود را مجدد وارد کنید"
                />
              </div>
              <div className="form-error p-2 w-full">
                <ul>
                  <li>
                    <span>{errors.passwordRequired}</span>
                  </li>
                  <li>
                    <span>{errors.passwordValidation}</span>
                  </li>
                  <li>
                    <span>{errors.passwordRepeatRequired}</span>
                  </li>
                  <li>
                    <span>{errors.passwordCharacterRule}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                onClick={(event) => {
                  registerUser(event)
                }}
                className="bg-green-500 rounded-md text-white p-2 px-6"
              >
                ثبت‌نام
              </button>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-700">
                قبلا ثبت‌نام کردی؟{' '}
                <Link className="text-cyan-600 cursor-pointer" to="/login">
                  وارد شوید
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
