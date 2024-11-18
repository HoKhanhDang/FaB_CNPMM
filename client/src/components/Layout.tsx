import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import NavMenu from "./header/NavMenu";
import Header from "./header/Header";
import LoadingPage from "./loading/LoadingPage";
import Footer from "./footer/Footer";
import { FaArrowUp } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";

const Layout = () => {
    const [isOpenNavMenu, setIsOpenNavMenu] = useState(false);
    const [showMoveToTop, setShowMoveToTop] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 2000) {
            setShowMoveToTop(true);
        } else {
            setShowMoveToTop(false);
        }
    };
    useEffect(() => {
        // increaseView();
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div className="h-auto max-w-screen">
            {isOpenNavMenu && (
                <NavMenu
                    handleOpenMenu={() => setIsOpenNavMenu(!isOpenNavMenu)}
                />
            )}
            <Header setIsOpenNavMenu={setIsOpenNavMenu} />

            <Suspense fallback={<LoadingPage />}>
                <Outlet />
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
};

export default Layout;
