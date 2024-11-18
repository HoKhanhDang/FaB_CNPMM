import React, { lazy, useEffect, startTransition, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { permissionPath } from "./constant/permission.constant";
import SocketSingleton from "./socket";
import { sendNotificationAction } from "./redux/api/notification";
import Swal from "sweetalert2";
import Layout from "./components/Layout";
import Loading from "./components/loading/LoadingPage";
import { loginAPI } from "./pages/Auth/auth.service";
import { login } from "./redux/slice/user.slice";
import Test from "./pages/Test/Test";

const DashBoard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Staff = lazy(() => import("./pages/Staff/Staff"));
const Customer = lazy(() => import("./pages/Customer/Customer"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Ingredient = lazy(() => import("./pages/Ingredient/Ingredients"));
const Order = lazy(() => import("./pages/Order/Order"));
const Kitchen = lazy(() => import("./pages/Kitchen/KitchenFlow"));
const HistoryOrder = lazy(() => import("./pages/HistoryOrder/History"));
const Notification = lazy(() => import("./pages/Notification/Notification"));
const Shipper = lazy(() => import("./pages/Shipper/Shipper"));
const Schedule = lazy(() => import("./pages/ShiftSchedule/Schedule"));
const Grid = lazy(() => import("./pages/Layout/Grid"));

function App() {
    const { isLogin, role, permissions } = useSelector(
        (state: any) => state.userSlice
    );
    const pathname = window.location.pathname;
    const socket = SocketSingleton.getInstance();
    const dispatch: any = useDispatch();

    const navigate = useNavigate();

    //check permission
    useEffect(() => {
        startTransition(() => {
            if (!isLogin && window.location.hash !== "#/register") {
                navigate("/login");
            }
            if (role == "shipper" && window.location.pathname !== "#/shipper") {
                navigate("/shipper");
            }

            //check permission
            const checkPermission = permissionPath.find(
                (item) => item.path === pathname
            );
            if (
                checkPermission &&
                !permissions.includes(checkPermission.permission)
            ) {
                toast.error("Permission denied");
                navigate("/");
            }
        });
    }, [isLogin, navigate]);

    useEffect(() => {
        socket.connect();
        socket.on("orderCancelNotification", (orderId: string) => {
            dispatch(
                sendNotificationAction({
                    title: "Order has been cancelled" as string,
                    content: `Order ${orderId} has been cancelled` as string,
                    link: `/order/${orderId}` as string,
                    type: "failed" as string,
                })
            );
            Swal.fire({
                title: `Order #${orderId} has been cancelled`,
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
                },
                position: "top",
                timer: 2000,
            });
        });

        return () => {
            socket.off("orderCancelNotification");
        };
    }, []);

    useEffect(() => {
        sessionStorage.setItem("demo", "true");
    }, []);

    return (
        <div className="App">
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/test" element={<Test />} />
                    {isLogin && (
                        <>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<DashBoard />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/staff" element={<Staff />} />
                                <Route
                                    path="/customer"
                                    element={<Customer />}
                                />
                                <Route path="/menu" element={<Menu />} />
                                <Route
                                    path="/ingredient"
                                    element={<Ingredient />}
                                />
                                <Route
                                    path="/history_order"
                                    element={<HistoryOrder />}
                                />
                                <Route path="/order" element={<Order />} />
                                <Route path="/kitchen" element={<Kitchen />} />
                                <Route
                                    path="/notification"
                                    element={<Notification />}
                                />
                                <Route
                                    path="/schedule"
                                    element={<Schedule />}
                                />

                                <Route path="/grid" element={<Grid />} />
                            </Route>
                            <Route path="/shipper" element={<Shipper />} />
                        </>
                    )}
                </Routes>
            </Suspense>
            <ToastContainer />
        </div>
    );
}

export default App;
