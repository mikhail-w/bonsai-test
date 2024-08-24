import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PlantsPage from './pages/PlantsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/CartPage.jsx';
import EssentialsPage from './pages/EssentialsPage.jsx';
import PlantersPage from './pages/PlantersPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import OrderListPage from './pages/OrderListPage.jsx';
import ProductEditPage from './pages/ProductEditPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProfileDashboard from './pages/ProfileDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/profile',
        // element: <ProfilePage />,
        element: <ProfileDashboard />,
      },
      {
        path: '/cart/:id?',
        element: <CartPage />,
      },
      {
        path: '/order/:id?',
        element: <OrderPage />,
      },
      {
        path: '/essentials',
        element: <EssentialsPage />,
      },
      {
        path: '/planters',
        element: <PlantersPage />,
      },
      {
        path: '/plants',
        element: <PlantsPage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/shipping/:id?',
        element: <ShippingPage />,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        path: '/placeorder',
        element: <PlaceOrderPage />,
      },
      {
        path: '/product/:id?',
        element: <ProductPage />,
      },
      {
        path: '/admin/userlist',
        element: <UserListPage />,
      },
      {
        path: '/admin/productlist',
        element: <ProductListPage />,
      },
      {
        path: '/admin/product/:id/edit',
        element: <ProductEditPage />,
      },
      {
        path: '/admin/orderlist',
        element: <OrderListPage />,
      },
      {
        path: '/admin/user/:id/edit',
        element: <UserEditPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
