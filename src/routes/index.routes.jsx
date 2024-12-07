import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import CategoryManager from "../pages/categoryManager/CategoryManager";
import AdminLayout from "../layouts/AdminLayout";
import UserManager from "../pages/userManager/UserManager";
import ProductManager from "../pages/productManager/ProductManager";
import NotFound from "../pages/notFound/NotFound";

const routers = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "category-manager",
        element: <CategoryManager />,
      },
      {
        path: "user-manager",
        element: <UserManager />,
      },
      {
        path: "product-manager",
        element: <ProductManager />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routers;
