import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const DashboardLayout = lazy(() => import("../layout/DashboardLayout"));
const Auth = lazy(() => import("../features/auth/pages/Auth"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Otp = lazy(() => import("../features/auth/pages/Otp"));
const Product = lazy(() => import("../features/products/pages/Product"));
const Statistic = lazy(() => import("../features/statistic/pages/Statistic"));
const User = lazy(() => import("../features/user/pages/User"));
const Category = lazy(() => import("../features/products/pages/Category"));
const Profile = lazy(() => import("../features/profile/pages/profile"));
const ProductItem = lazy(
  () => import("../features/products/pages/ProductItem")
);

const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <Statistic />,
            },
            {
              path: "/product",
              element: <Product />,
              children: [
                {
                  index: true,
                  element: <ProductItem />,
                },
                {
                  path: "category",
                  element: <Category />,
                },
              ],
            },
            {
              path: "/user",
              element: <User />,
            },
            {
              path: "/profile",
              element: <Profile />,
            },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/otp", element: <Otp /> },
  ]);
};

export default AppRoutes;
