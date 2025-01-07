import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
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
import Dashboard from './components/Dashboard/Dashboard.jsx';
import ThreeDModel from './pages/ThreeDModel.jsx';
import MapPage from './pages/MapPage.jsx';
import Favorites from './pages/Favorites.jsx';
import Settings from './pages/Settings.jsx';
import BlogPage from './pages/BlogPage.jsx'; // List of all blog posts
import BlogPostPage from './pages/BlogPostPage.jsx'; // Individual blog post page
import AugmentedReality from './components/Dashboard/AugmentedReality.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import PlantIdentifier from './components/Dashboard/PlantIdentifier.jsx';
import Chat from './components/Dashboard/Chat.jsx';

//Instruction page
import CarePage_Style from './pages/CarePage_Style.jsx';
import CarePage from './pages/CarePage.jsx';
import CarePage_Prepare from './pages/CarePage_Prepare.jsx';
import CarePage_Care from './pages/CarePage_Care.jsx';
import UserProfile from './components/Dashboard/UserProfile.jsx';

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
        element: <Dashboard />,
        children: [
          { path: 'info', element: <UserProfile /> },
          { path: 'threeDModel', element: <ThreeDModel /> },
          { path: 'explore', element: <MapPage /> },
          { path: 'blog', element: <BlogPage /> },
          { path: 'ar', element: <AugmentedReality /> },
          { path: 'favorites', element: <Favorites /> },
          { path: 'chat', element: <Chat /> },
          { path: 'id', element: <PlantIdentifier /> },
          { path: 'settings', element: <Settings /> },
          { path: 'order/:id?', element: <OrderPage /> },
          { path: 'admin/userlist', element: <UserListPage /> },
          { path: 'admin/user/:id/edit', element: <UserEditPage /> },
          { path: 'admin/productlist', element: <ProductListPage /> },
          { path: 'admin/product/:id/edit', element: <ProductEditPage /> },
          { path: 'admin/orderlist', element: <OrderListPage /> },
          {
            path: 'care',
            element: <CarePage />,
            children: [
              { path: 'preparing', element: <CarePage_Prepare /> },
              { path: 'caring', element: <CarePage_Care /> },
              { path: 'styling', element: <CarePage_Style /> },
            ],
          },
        ],
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
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/blog', // Route for listing all blog posts
        element: <BlogPage />,
      },
      {
        path: '/blog/:id?', // Route for viewing a specific blog post
        element: <BlogPostPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
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
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
