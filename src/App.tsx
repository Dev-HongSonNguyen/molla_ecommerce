import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutClient from "./components/Layout/LayoutClient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import LoadingPage from "./components/Common/LoadingPage";
import SignupPage from "./pages/client/SignupPage";
import SigninPage from "./pages/client/SigninPage";
import PageNotFound from "./pages/PageNotFound";
import UserManagerPage from "./pages/admin/UserModules/UserManagerPage";
import UserUpdatePage from "./pages/admin/UserModules/UserUpdatePage";
import CategoryPage from "./pages/client/CategoryPage";
import CommentMangerPage from "./pages/admin/CommentModules/CommentMangerPage";
import BlogManagerPage from "./pages/admin/BlogModules/BlogManagerPage";
import BlogAddPage from "./pages/admin/BlogModules/BlogAddPage";
import BlogUpdatePage from "./pages/admin/BlogModules/BlogUpdatePage";
const HomePage = React.lazy(() => import("./pages/client/HomePage"));
const DashboardPage = React.lazy(() => import("./pages/admin/DashboardPage"));
const BookAddPage = React.lazy(
  () => import("./pages/admin/BookModules/BookAddPage")
);
const BookManagerPage = React.lazy(
  () => import("./pages/admin/BookModules/BookManagerPage")
);
const BookUpdatePage = React.lazy(
  () => import("./pages/admin/BookModules/BookUpdatePage")
);
const CategoryManagerPage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryManagerPage")
);
const CategoryUpdatePage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryUpdatePage")
);
const CategoryAddPage = React.lazy(
  () => import("./pages/admin/CategoryModules/CategoryAddPage")
);
const OrderManagerPage = React.lazy(
  () => import("./pages/admin/OrderModules/OrderManagerPage")
);
const OrderDetailPage = React.lazy(
  () => import("./pages/admin/OrderModules/OrderDetailPage")
);
const OrderUpdatePage = React.lazy(
  () => import("./pages/admin/OrderModules/OrderUpdatePage")
);
const UserProfile = React.lazy(() => import("./pages/client/UserProfile"));
const CartPage = React.lazy(() => import("./pages/client/CartPage"));
const Checkout = React.lazy(() => import("./pages/client/Checkout"));
const ProductDetail = React.lazy(() => import("./pages/client/ProductDetail"));
const MyOrder = React.lazy(() => import("./pages/client/MyOrder"));
const MyOrderDetail = React.lazy(() => import("./pages/client/MyOrderDetail"));
const ThankPage = React.lazy(() => import("./pages/client/ThankPage"));
function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<LayoutClient />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="order" element={<MyOrder />} />
            <Route path="order/:id" element={<MyOrderDetail />} />
            <Route path="category/:id" element={<CategoryPage />} />
            <Route path="thank" element={<ThankPage />} />
          </Route>
          <Route path="admin" element={<LayoutAdmin />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="book">
              <Route index element={<BookManagerPage />} />
              <Route path="add" element={<BookAddPage />} />
              <Route path="update/:id" element={<BookUpdatePage />} />
            </Route>
            <Route path="category">
              <Route index element={<CategoryManagerPage />} />
              <Route path="add" element={<CategoryAddPage />} />
              <Route path="update/:id" element={<CategoryUpdatePage />} />
            </Route>
            <Route path="order">
              <Route index element={<OrderManagerPage />} />
              <Route path=":id" element={<OrderDetailPage />} />
              <Route path="update/:id" element={<OrderUpdatePage />} />
            </Route>
            <Route path="user">
              <Route index element={<UserManagerPage />} />
              <Route path="update/:id" element={<UserUpdatePage />} />
            </Route>
            <Route path="comment">
              <Route index element={<CommentMangerPage />} />
            </Route>
            <Route path="blog">
              <Route index element={<BlogManagerPage />} />
              <Route path="add" element={<BlogAddPage />} />
              <Route path="update/:id" element={<BlogUpdatePage />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
