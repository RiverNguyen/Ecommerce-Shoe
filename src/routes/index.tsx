import AttributeAdd from "@/pages/(dashboard)/attribute/_component/add";
import AttributeAddValues from "@/pages/(dashboard)/attribute/_component/addValues";
import AttributeManagement from "@/pages/(dashboard)/attribute/page";
import CategoryAdd from "@/pages/(dashboard)/category/_component/add";
import LayoutAdmin from "@/pages/(dashboard)/layout";
import OrderDetailManagement from "@/pages/(dashboard)/order/detail/page";
import { OrderManagement } from "@/pages/(dashboard)/order/page";
import ProductAdd from "@/pages/(dashboard)/product/_component/add";
import ProductEditPage from "@/pages/(dashboard)/product/_component/edit";
import ProductList from "@/pages/(dashboard)/product/_component/list";
import TestAdd from "@/pages/(dashboard)/product/_component/test";
import ProductManagement from "@/pages/(dashboard)/product/page";
import AuthPage from "@/pages/(website)/(auth)/page";
import NotFound from "@/pages/(website)/404/page";
import CartPage from "@/pages/(website)/cart/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { OrderListPage } from "@/pages/(website)/order/_component/OrderList";
import { OrderDetail } from "@/pages/(website)/order/detail/page";
import OrderPage from "@/pages/(website)/order/page";
import CategoryDetail from "@/pages/(website)/product/category/detail/page";
import ProductDetail from "@/pages/(website)/product/detail/page";
import TestDetail from "@/pages/(website)/product/detail/test";
import ShopPage from "@/pages/(website)/product/page";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ThanksPage from "@/pages/(website)/thanks/page";

const Router = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route path="/" index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                    <Route path="detail/:id" element={<ProductDetail />} />
                    <Route path="categories/:id" element={<CategoryDetail />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route
                        path="order-list/:userId"
                        element={<OrderListPage />}
                    />
                    <Route path="order/:id" element={<OrderDetail />} />
                    <Route path="order" element={<OrderPage />} />
                    <Route path="sign-up" element={<AuthPage />} />
                    <Route path="sign-in" element={<AuthPage />} />
                    <Route path="thanks" element={<ThanksPage />} />
                    <Route path="test" element={<TestDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route
                    path="admin"
                    element={
                        <PrivateRoute>
                            <LayoutAdmin />/
                        </PrivateRoute>
                    }
                >
                    <Route index element={<ProductManagement />} />
                    <Route path="products" element={<ProductList />} />
                    <Route
                        path="attributes"
                        element={<AttributeManagement />}
                    />
                    <Route path="attributes/add" element={<AttributeAdd />} />
                    <Route
                        path="attributes/:id/values"
                        element={<AttributeAddValues />}
                    />

                    <Route path="products/add" element={<ProductAdd />} />
                    <Route path="products/add1" element={<TestAdd />} />
                    <Route
                        path="products/edit/:id"
                        element={<ProductEditPage />}
                    />
                    <Route path="categories/add" element={<CategoryAdd />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route
                        path="orders/:id"
                        element={<OrderDetailManagement />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Router;
