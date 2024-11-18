import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { lazy, Suspense, useEffect } from "react";

//components
import Loading from "./components/loading/LoadingPage";
import Layout from "./components/Layout";
const apiUrl = import.meta.env.VITE_URL_SERVER;

//pages
const Main = lazy(() => import("./pages/Main/Main"));
const AboutUs = lazy(() => import("./pages/About/AboutUs"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Detail = lazy(() => import("./pages/DetailItem/Detail"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const Profile = lazy(() => import("./pages/ProfileDetail/Profile"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const VnpayReturn = lazy(() => import("./pages/Payment/VnpayReturn"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

function App() {
    const increaseView = async () => {
        await fetch(`${apiUrl}/api/chart/view`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    useEffect(() => {
        increaseView();
    }, []);

    return (
        <div className="bg-white w-screen h-full overflow-x-hidden">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/auth" element={<Auth />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />

                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/menu?:id" element={<Detail />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/vnpay_return" element={<VnpayReturn />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
