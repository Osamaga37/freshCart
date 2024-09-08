import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { UserContextProvider } from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishList from "./components/WishList/WishList";
import Orders from "./components/Orders/Orders";
import WishListContextProvider from "./Context/WishLstContext";
import ForgotPassword from "./components/ForgetPassword/ForgotPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Payment from "./components/Payment/Payment";

let pages = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/:category",
        element: (
          <ProtectedRoute>
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands/",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "branddetails/:id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      {
        path: "verifycode",
        element: <VerifyCode />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

let query = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={pages}></RouterProvider>
          </WishListContextProvider>
        </CartContextProvider>
        <Toaster />
        <ReactQueryDevtools />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
