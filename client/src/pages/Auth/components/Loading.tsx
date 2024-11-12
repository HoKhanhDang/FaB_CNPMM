export default function Loading() {
    return (
        <div className="fixed top-0 left-0 h-full w-full z-40 flex justify-center items-center bg-blue-100 opacity-40">
            <div className="w-16 h-16 border-4 border-t-[#3498db] rounded-full animate-spin z-50"></div>
        </div>
    );
}
