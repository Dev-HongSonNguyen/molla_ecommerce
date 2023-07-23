import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LayoutClient from "./components/Layout/LayoutClient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import LoadingPage from "./components/Common/LoadingPage";
import SignupPage from "./pages/client/SignupPage";
import SigninPage from "./pages/client/SigninPage";
import PageNotFound from "./pages/PageNotFound";
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
const UserProfile = React.lazy(() => import("./pages/client/UserProfile"));
const CartPage = React.lazy(() => import("./pages/client/CartPage"));
const Checkout = React.lazy(() => import("./pages/client/Checkout"));
const ProductDetail = React.lazy(() => import("./pages/client/ProductDetail"));
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
          </Route>
          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<DashboardPage />} />
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
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;
