import { createBrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { Spin } from "antd";

// Các bước áp dụng kỹ thuật lazy loading
// B1: Import layzy các file cần thiết
const Dashboard = React.lazy(() => import("../pages/dashboard/Dashboard"));
const CategoryManager = React.lazy(() =>
  import("../pages/categoryManager/CategoryManager")
);
const AdminLayout = React.lazy(() => import("../layouts/AdminLayout"));
const UserManager = React.lazy(() =>
  import("../pages/userManager/UserManager")
);
const ProductManager = React.lazy(() =>
  import("../pages/productManager/ProductManager")
);
const NotFound = React.lazy(() => import("../pages/notFound/NotFound"));

// Bước 2: Bọc các component này vào trong component Supense
const LazyLoader = ({ children }) => {
  return <Suspense fallback={<Spin size="large" />}>{children}</Suspense>;
};

const routers = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <LazyLoader>
        <AdminLayout />
      </LazyLoader>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyLoader>
            <Dashboard />
          </LazyLoader>
        ),
      },
      {
        path: "category-manager",
        element: (
          <LazyLoader>
            <CategoryManager />
          </LazyLoader>
        ),
      },
      {
        path: "user-manager",
        element: (
          <LazyLoader>
            <UserManager />
          </LazyLoader>
        ),
      },
      {
        path: "product-manager",
        element: (
          <LazyLoader>
            <ProductManager />
          </LazyLoader>
        ),
      },
      {
        path: "*",
        element: (
          <LazyLoader>
            <NotFound />
          </LazyLoader>
        ),
      },
    ],
  },
]);

export default routers;
