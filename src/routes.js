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
import Orders from './pages/adminPanel/CustomerPanel/Orders/Orders'
import CustomerDashboard from './pages/adminPanel/CustomerPanel/CustomerDashBoard/CustomerDashBoard'
import Addresses from './pages/adminPanel/CustomerPanel/Addresses/Addresses'
import Notifications from './pages/adminPanel/CustomerPanel/Notifications/Notifications'
import Tickets from './pages/adminPanel/CustomerPanel/Tickets/Tickets'
import EditAccount from './pages/adminPanel/CustomerPanel/EditAccount/EditAccount'
import Bookmarked from './pages/adminPanel/CustomerPanel/Bookmarked/Bookmarked'
import AdminLayout from './components/Admin/AdminLayout'
import DIscounts from './pages/adminPanel/Discounts/DIscounts'

const routes = [
  { path: '/', Component: IndexPage },
  { path: '/product/:productID', Component: ProductInfo },
  { path: '/category/:categoryName', Component: Category },
  { path: '/category/:categoryName/:subCategory', Component: Category },
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
      { index: true, Component: CustomerDashboard },
      { path: 'orders', Component: Orders },
      { path: 'addresses', Component: Addresses },
      { path: 'notifications', Component: Notifications },
      { path: 'tickets', Component: Tickets },
      { path: 'edit-account', Component: EditAccount },
      { path: 'bookmarked', Component: Bookmarked },
    ],
  },
  {
    path: '/admin/*',
    Component: AdminLayout,
    children: [
      { index: true, Component: IndexDashboard },
      { path: 'users', Component: Users },
      { path: 'books', Component: Books },
      { path: 'posts', Component: Posts },
      { path: 'comments', Component: Comments },
      { path: 'discounts', Component: DIscounts },
      { path: 'categories', Component: Categories },
      { path: 'writers', Component: Writers },
      { path: 'translators', Component: Translators },
    ],
  },
]

export default routes
