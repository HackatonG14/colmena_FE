import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectRoute from '../utils/ProtectRoute';
import LoadingScreen from '../components/LoadingScreen';

// Lazy load pages for better performance
const Home = lazy(() => import('../pages/Home'));
const Shops = lazy(() => import('../pages/Shops'));
const Contact = lazy(() => import('../pages/Contact'));
const Categories = lazy(() => import('../pages/Categories'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const MyOrders = lazy(() => import('../pages/MyOrders'));
const MyWishlist = lazy(() => import('../pages/MyWishlist'));
const ChangePassword = lazy(() => import('../pages/ChangePassword'));
const Card = lazy(() => import('../pages/Card'));
const CategoryShop = lazy(() => import('../pages/CategoryShop'));
const SearchProducts = lazy(() => import('../pages/SearchProducts'));
const Details = lazy(() => import('../pages/Details'));
const ConfirmOrder = lazy(() => import('../pages/ConfirmOrder'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Wrap lazy loaded components in Suspense
const WrapperComponent = ({ element }) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {element}
    </Suspense>
  );
};

// Public routes (available to all users)
export const publicRoutes = [
  {
    path: '/',
    element: <WrapperComponent element={<Home />} />
  },
  {
    path: '/shops',
    element: <WrapperComponent element={<Shops />} />
  },
  {
    path: '/categories',
    element: <WrapperComponent element={<Categories />} />
  },
  {
    path: '/contact',
    element: <WrapperComponent element={<Contact />} />
  },
  {
    path: '/login',
    element: <WrapperComponent element={<Login />} />
  },
  {
    path: '/register',
    element: <WrapperComponent element={<Register />} />
  },
  {
    path: '/cart',
    element: <WrapperComponent element={<Card />} />,
  },
  {
    path: '/products',
    element: <WrapperComponent element={<CategoryShop />} />,
  },
  {
    path: '/products/search',
    element: <WrapperComponent element={<SearchProducts />} />,
  },
  {
    path: '/product/details/:slug',
    element: <WrapperComponent element={<Details />} />,
  },
  {
    path: '/order/confirm',
    element: <WrapperComponent element={<ConfirmOrder />} />,
  },
  {
    path: '*',
    element: <WrapperComponent element={<NotFound />} />
  }
];

// Protected routes (require authentication)
export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <ProtectRoute />,
    children: [
      {
        path: '',
        element: <DashboardLayout>
          <WrapperComponent element={<Dashboard />} />
        </DashboardLayout>
      },
      {
        path: 'my-orders',
        element: <DashboardLayout>
          <WrapperComponent element={<MyOrders />} />
        </DashboardLayout>
      },
      {
        path: 'my-wishlist',
        element: <DashboardLayout>
          <WrapperComponent element={<MyWishlist />} />
        </DashboardLayout>
      },
      {
        path: 'change-password',
        element: <DashboardLayout>
          <WrapperComponent element={<ChangePassword />} />
        </DashboardLayout>
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
]; 