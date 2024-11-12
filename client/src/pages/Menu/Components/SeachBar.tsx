import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [params] = useSearchParams();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search === "") {
            params.delete("search");
            return navigate(`/menu?${params.toString()}`);
        }
        params.set("search", search);
        navigate(`/menu?${params.toString()}`);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-20 bg-white shadow-2xl border-b-2 gap-2 py-[100px]">
            <span className="max-sm:text-[1rem] sn:text-[2rem] font-bold text-center">
                It’s the food and groceries you Love
            </span>

            <div className="flex flex-row items-center w-2/3 gap-2">
               
                <input
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search for food"
                    className="w-full h-[50px] px-[30px] text-lg text-gray-600 bg-gray-100 rounded-full focus:outline-none"
                />
                <button
                    onClick={handleSearch}
                    className="w-[50vw] h-[50px] bg-red-500 rounded-full text-white font-bold"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
