import IndexPage from './pages/IndexPage'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Cart from './pages/Cart'
import ArticleInfo from './pages/ArticleInfo'
import Articles from './pages/Articles'
import Category from './pages/Category'
import ProductInfo from './pages/ProductInfo'
import Checkout from './pages/Checkout'
import AdminDashboard from './pages/adminPanel/index'
import Users from './pages/adminPanel/Users/Users'
import Books from './pages/adminPanel/Books/Books'
import Posts from './pages/adminPanel/Posts/Posts'
import Comments from './pages/adminPanel/Comments/Comments'
import Categories from './pages/adminPanel/Categories/Categories'
import Writers from './pages/adminPanel/Writers/Writers'
import Translators from './pages/adminPanel/Translators/Translators'
import IndexDashboard from './pages/adminPanel/IndexDashboard/IndexDashboard'
import Contact from './pages/Contact'

const routes = [
  { path: '/', Component: IndexPage },
  { path: '/product/:productID', Component: ProductInfo },
  { path: '/category/:categoryName', Component: Category },
  { path: '/Register', Component: Register },
  { path: '/Login', Component: Login },
  { path: '/article/:articleID', Component: ArticleInfo },
  { path: '/blog', Component: Articles },
  { path: '/about', Component: About },
  { path: '/contact-us', Component: Contact },
  { path: '/cart', Component: Cart },
  { path: '/checkout', Component: Checkout },
  {
    path: '/dashboard/*',
    Component: AdminDashboard,
    children: [
      { path: 'index', Component: IndexDashboard },
      { path: 'users', Component: Users },
      { path: 'books', Component: Books },
      { path: 'posts', Component: Posts },
      { path: 'comments', Component: Comments },
      { path: 'categories', Component: Categories },
      { path: 'writers', Component: Writers },
      { path: 'translators', Component: Translators },
    ],
  },
]

// const routes = createBrowserRouter([
//   { path: '/', Component: IndexPage },
//   { path: '/product/:productID', Component: ProductInfo },
//   { path: '/category/:categoryName', Component: Category },
//   { path: '/Register', Component: Register },
//   { path: '/Login', Component: Login },
//   { path: '/article/:articleID', Component: ArticleInfo },
//   { path: '/blog', Component: Articles },
//   { path: '/about', Component: About },
//   { path: '/cart', Component: Cart },
//   { path: '/checkout', Component: Checkout },
//   {
//     path: '/dashboard/*',
//     Component: AdminDashboard,
//     children: [
//       { path: 'index', Component: IndexDashboard },
//       { path: 'users', Component: Users },
//       { path: 'books', Component: Books },
//       { path: 'posts', Component: Posts },
//       { path: 'comments', Component: Comments },
//       { path: 'categories', Component: Categories },
//       { path: 'writers', Component: Writers },
//       { path: 'translators', Component: Translators },
//     ],
//   },
// ])

export default routes
