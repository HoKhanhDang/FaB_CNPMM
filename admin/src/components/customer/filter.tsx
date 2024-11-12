import { set } from "date-fns";
import React, { useState, useEffect } from "react";
import {
    useSearchParams,
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";

import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Swal from "sweetalert2";

//MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Filter() {
    const location = useLocation();
    const pathname = location.pathname;
    const subdirectory = pathname.split("/")[1];

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");

    const [startDay, setStartDay] = useState("1980");
    const [endDay, setEndDay] = useState("2010");
    const minYear = 1980;
    const maxYear = 2010;

    useEffect(() => {
        params.delete("page");
        params.append("page", "1");

        params.delete("search");
        params.append("search", search);
        if (search === "") {
            params.delete("search");
        }
        navigate(`?${params.toString()}`);
    }, [search]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {}, [status]);
    const handleFilterStatus = (event: SelectChangeEvent) => {
        params.delete("page");
        params.append("page", "1");
        setStatus(event.target.value);
        params.delete("status");
        params.append("status", event.target.value);
        if (event.target.value === "") {
            params.delete("status");
        }
        navigate(`?${params.toString()}`);
    };

    const handleFilterGender = (event: SelectChangeEvent) => {
        params.delete("page");
        params.append("page", "1");

        setGender(event.target.value);
        params.delete("gender");
        params.append("gender", event.target.value);
        if (event.target.value === "") {
            params.delete(gender);
        }
        navigate(`?${params.toString()}`);
    };

    const handleStartDayChange = (value: moment.Moment | string) => {
        if (typeof value === "string") return;
        const year = value.format("YYYY");
        if (
            parseInt(year) <= maxYear &&
            parseInt(year) >= minYear &&
            parseInt(year) < parseInt(endDay)
        ) {
            params.delete("page");
            params.append("page", "1");
            setStartDay(year);
            params.delete("startDay");
            params.append("startDay", year);
            navigate(`?${params.toString()}`);
        } else if (parseInt(year) >= parseInt(endDay)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Start year must be less than end year !",
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It must be greater than 1980 and less than 2010 !",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };

    const handleEndDayChange = (value: moment.Moment | string) => {
        if (typeof value === "string") {
            return;
        }
        const year = value.format("YYYY");
        if (
            parseInt(year) <= maxYear &&
            parseInt(year) >= minYear &&
            parseInt(year) > parseInt(startDay)
        ) {
            params.delete("page");
            params.append("page", "1");
            setEndDay(year);

            params.delete("endDay");
            params.append("endDay", year);
            navigate(`?${params.toString()}`);
        } else if (parseInt(year) <= parseInt(startDay)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "End year must be greater than start year !",
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It must be greater than 1980 and less than 2010 !",
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };
    const handleReset = () => {
        setSearch("");
        setStartDay("1980");
        setEndDay("2010");
        setGender("");
        setStatus("");

        params.delete("search");
        params.delete("startDay");
        params.delete("endDay");
        params.delete("gender");
        params.delete("status");

        navigate(`?${params.toString()}`);
    };
    return (
        <div className="w-full h-full bg-slate-400 rounded-xl flex flex-row justify-start items-center gap-2 px-5 py-2">
            <span className=" font-bold text-[15px]">Search</span>
            <div className="w-auto flex h-auto flex-col justify-start">
                <input
                    id="email"
                    type="text"
                    value={search}
                    className="w-[150px] h-[40px] p-2 border border-gray-300 rounded-md"
                    onChange={handleSearch}
                />
            </div>

            <Box sx={{ minWidth: 120, height: 40 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-standard-label">
                        Gender
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={gender}
                        label="Gender"
                        onChange={handleFilterGender}
                        className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white flex items-center"
                    >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {subdirectory === "account" ? (
                <Box sx={{ minWidth: 120, height: 40 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Status
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={status}
                            label="Status"
                            onChange={handleFilterStatus}
                            className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white"
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"banned"}>Banned</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            ) : null}

            <div className="w-auto flex h-auto flex-row justify-start ">
                <div className="w-full flex flex-row gap-2 items-center justify-center">
                    <span className=" font-bold text-[15px]">From</span>

                    <Datetime
                        value={startDay}
                        onChange={(value) => handleStartDayChange(value)}
                        dateFormat="YYYY"
                        timeFormat={false}
                    />

                    <span className=" font-bold text-[15px]"> to </span>

                    <Datetime
                        value={endDay}
                        onChange={(value) => handleEndDayChange(value)}
                        dateFormat="YYYY"
                        timeFormat={false}
                    />
                </div>
            </div>
            <div className="w-auto flex h-auto flex-row justify-start items-center gap-2"></div>
            <div className="w-auto flex h-auto flex-row justify-between items-center gap-2 cursor-pointer">
                <div
                    onClick={handleReset}
                    className="w-[150px] h-10 flex justify-center items-center bg-yellow-500 hover:bg-yellow-200 text-white rounded-md"
                >
                    Reset
                </div>
            </div>
        </div>
    );
}
