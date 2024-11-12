import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaArrowsRotate } from "react-icons/fa6";

const statusItems = [
    {
        value: "active",
        label: "Active",
    },
    {
        value: "pending",
        label: "Pending",
    },
    {
        value: "off",
        label: "Off",
    },
    {
        value: "banned",
        label: "Banned",
    },
];

const roleItems = [
    {
        value: "admin",
        label: "Admin",
    },
    {
        value: "cashier",
        label: "Cashier",
    },
    {
        value: "chef",
        label: "Chef",
    },
]

export default function FilterBar() {
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [search, setSearch] = useState("");

    const [params] = useSearchParams();

    const handleReset = () => {
        setStatus("");
        setRole("");
        setSearch("");
        params.delete("status");
        params.delete("role");
        params.delete("search");
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
    const handleChangeRole = (event: any) => {
        setRole(event.target.value as string);
        if (event.target.value === "") {
            params.delete("role");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("role");
        params.append("role", event.target.value as string);
        navigate(`?${params.toString()}`);
    };
    const handleChangeSearch = (event: any) => {
        setSearch(event.target.value as string);
        if (event.target.value === "") {
            params.delete("search");
            navigate(`?${params.toString()}`);
            return;
        }
        params.delete("search");
        params.append("search", event.target.value as string);
        navigate(`?${params.toString()}`);
    };

    return (
        <div className="w-full h-[10%] bg-main-bg px-5 py-2 flex justify-center items-center">
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
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"pending"}>Pending</MenuItem>
                            <MenuItem value={"off"}>Off</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ minWidth: 120, height: 40 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-standard-label">
                            Role
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={role}
                            label="Role"
                            onChange={handleChangeRole}
                            className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white flex items-center"
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"chef"}>Chef</MenuItem>
                            <MenuItem value={"cashier"}>Cashier</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <FaArrowsRotate
                    onClick={handleReset}
                    className="text-[30px] hover:text-rose-600"
                />
            </div>
        </div>
    );
}
