import { Route, Routes } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, lazy, Suspense } from "react";

//components
import NavMenu from "./components/header/NavMenu";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading/LoadingPage";
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

function App() {
    const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
    const [showMoveToTop, setShowMoveToTop] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 2000) {
            setShowMoveToTop(true);
        } else {
            setShowMoveToTop(false);
        }
    };
    // const increaseView = async () => {
    //     await fetch("http://localhost:5000/api/chart/view", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    // }
    useEffect(() => {
        // increaseView();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-white w-screen h-full overflow-x-hidden">
            {isOpenNavMenu && (
                <NavMenu
                    handleOpenMenu={() => setIsOpenNavMenu(!isOpenNavMenu)}
                />
            )}
            <Header setIsOpenNavMenu={setIsOpenNavMenu} />
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu?:id" element={<Detail />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/vnpay_return" element={<VnpayReturn />} />
                </Routes>
            </Suspense>

            <Footer />
            {showMoveToTop && (
                <div
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                    className="fixed bottom-5 right-5 p-5 rounded-[100px] bg-red-500 animate-bounce cursor-pointer"
                >
                    <FaArrowUp className="text-white text-[30px]" />
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default App;
