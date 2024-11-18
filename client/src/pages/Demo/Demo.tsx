import { images } from "../../assets/assets";
const adminUrl = import.meta.env.VITE_URL_ADMIN;

interface DemoProps {}
const Demo: React.FC<DemoProps> = ({}) => {
    const handleDirect = (e: any) => {
        const value = e.target.value;
        if (value === "client") {
            sessionStorage.setItem("demo", "false");
            sessionStorage.setItem("isGetDemo", "true");
            window.location.href = "/"; //link
            window.location.reload();
        } else {
            window.location.href = adminUrl; //link
        }
    };
    return (
        <div className="flex flex-col items-center justify-center max-sm:h-auto sm:h-screen bg-gray-50">
            <div className="text-2xl font-semibold text-blue-600 uppercase max-sm:h-[100px] sm:h-1/5 text-center">
                <img src={images.logo} className="w-auto h-full py-4" alt="" />
            </div>

            <div className="flex max-sm:flex-col sm:flex-row items-center justify-center w-full h-4/5 pb-[100px] gap-5 px-10">
                <div className="max-sm:w-full sm:w-1/2 h-full relative flex justify-center items-center rounded-xl overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/6612717/pexels-photo-6612717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="w-full h-full absolute top-0 left-0"
                        alt=""
                    />
                    <div className="absolute w-full h-full bg-black/50"></div>
                    <div className="flex flex-col sm:w-3/4 text-black z-50 max-sm:p-5 font-sans">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight text-orange-500 uppercase">
                            Khách hàng
                        </h2>
                        <p className="max-sm:text-sm sm:text-lg text-white mb-6 leading-relaxed">
                            Trải nghiệm mua sắm và đặt món ăn online tuyệt vời
                            với giao diện đẹp mắt! Đăng nhập ngay để khám phá
                            những tính năng độc đáo dành riêng cho bạn.
                        </p>
                        <button
                            value={"client"}
                            onClick={handleDirect}
                            className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white text-base font-medium shadow-lg transition-transform transform hover:scale-105"
                        >
                            Đăng nhập với tư cách khách hàng
                        </button>
                    </div>
                </div>

                <div className="max-sm:w-full sm:w-1/2 h-full relative flex justify-center items-center rounded-xl overflow-hidden">
                    <img
                        src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        className="w-full h-full absolute"
                        alt=""
                    />
                    <div className="absolute w-full h-full bg-black/50"></div>

                    <div className="flex flex-col sm:w-3/4 text-black z-50 max-sm:p-5 font-sans">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight text-blue-500 uppercase">
                            Quản trị viên
                        </h2>
                        <p className="text-lg text-white mb-6 leading-relaxed">
                            Khám phá giao diện quản lý nhà hàng số để tối ưu
                            trải nghiệm khách hàng và nâng cao hiệu suất. Hệ
                            thống quản trị mạnh mẽ giúp bạn dễ dàng kiểm soát và
                            quản lý mọi hoạt động nhanh chóng, hiệu quả.
                        </p>
                        <button
                            value={"admin"}
                            onClick={handleDirect}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-base font-medium shadow-lg transition-transform transform hover:scale-105"
                        >
                            Đăng nhập với tư cách quản trị viên
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed bottom-0 flex w-full flex-col justify-center items-center py-5">
                <div className="mt-4 text-xs text-gray-400">
                    2024 © Hephaestus Pte Ltd
                </div>
            </div>
        </div>
    );
};
export default Demo;
