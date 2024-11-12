import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FaArrowsRotate } from "react-icons/fa6";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";

interface FilterBarProps {
    setIsAdd: (value: boolean) => void;
}
const FilterBar: React.FC<FilterBarProps> = ({ setIsAdd }) => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [search, setSearch] = useState("");

    const [params] = useSearchParams();

    const handleReset = () => {
        setStatus("");
        setSearch("");
        params.delete("status");
        params.delete("title");
        navigate(`?${params.toString()}`);
    };

    const handleChangeStatus = (event: any) => {
        setStatus(event.target.value as string);
        if (event.target.value === "") {
            params.delete("status");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("status");
        params.append("status", event.target.value as string);
        navigate(`?${params.toString()}`);
    };
    const handleChangeSearch = (event: any) => {
        setSearch(event.target.value as string);
        if (event.target.value === "") {
            params.delete("title");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("title");
        params.append("title", event.target.value as string);
        navigate(`?${params.toString()}`);
    };

    return (
        <div className="w-full h-[10%] bg-transparent px-5 py-2 flex justify-center items-center">
            <div className=" w-full h-full flex justify-start items-center bg-white rounded-[20px] gap-5 px-5">
                <label htmlFor="search">Search</label>
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleChangeSearch}
                    className="w-[200px] h-[40px] border border-gray-400 rounded-md px-5 "
                />

                <Box sx={{ minWidth: 120, height: 40 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={status}
                            label="Status"
                            onChange={handleChangeStatus}
                            className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white flex items-center"
                        >
                            <MenuItem value={"false"}>Out</MenuItem>
                            <MenuItem value={"true"}>Active</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <FaArrowsRotate
                    onClick={handleReset}
                    className="text-[30px] hover:text-rose-600"
                />

                <div
                    onClick={() => setIsAdd(true)}
                    className="flex flex-row justify-center items-center group mx-2 hover:border-blue-400 border rounded-md p-2"
                >
                    <IoAddOutline className="text-[30px] group-hover:text-blue-400 " />
                    <span className="group-hover:text-blue-400">
                        Add Ingredient
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
