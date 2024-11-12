import { VscLoading } from "react-icons/vsc";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-blue-300 opacity-40">
            <VscLoading className="animate animate-spin-fast text-[60px]" />
        </div>
    );
}
