import logo from "../../assets/image/logo.png";
export default function Loading() {
    return (
        <div className="fixed inset-0 h-screen w-screen z-50 flex justify-center items-center bg-white opacity-100">
            <img src={logo} alt="" className="w-[100px] h-[100px]" />
        </div>
    );
}
