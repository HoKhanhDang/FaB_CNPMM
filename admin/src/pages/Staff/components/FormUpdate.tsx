import { memo, useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateStaffAPI, getStaffByIdAPI } from "../staff.service";
import Swal from "sweetalert2";
import PermissionDescriptor from "./ManagePermission";

interface FormUpdateProps {
    permissions: string[];
    _id: number;
    handleOpenFormUpdate: (item: any) => void;
}

const FormUpdate = ({ _id, handleOpenFormUpdate ,permissions}: FormUpdateProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const [isEmailError, setIsEmailError] = useState(false);
    const [isPhoneError, setIsPhoneError] = useState(false);

    const fetchData = async () => {
        const rs = await getStaffByIdAPI(_id); 
        const data = rs?.data?.data;
        setName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
        setStatus(data.status);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        const rs = await updateStaffAPI({
            user_id: _id,
            name: name,
            email: email,
            phone: phone,
            role: role,
            status: status,
        });
        if (rs?.status === 410) {
            setIsEmailError(true);
            return;
        } else if (rs?.status === 411) {
            setIsPhoneError(true);
            return;
        } else if (rs?.status === 200) {
            Swal.fire({
                title: "Success",
                text: "Update staff successfully",
                icon: "success",
                confirmButtonText: "OK",
                timer: 1500,
            });
            handleOpenFormUpdate(null);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-60  flex justify-center items-center z-40 px-[50px] gap-5">
            <div onClick={(e)=>e.stopPropagation()} className="!opacity-100 flex flex-col justify-start items-start w-1/3 h-2/3 bg-white p-5 rounded-lg z-50 gap-[20px]">
                <span className="text-[20px] font-bold self-center">Edit</span>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 px-2"
                />
                <input
                    disabled
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300  px-2"
                />
                {isEmailError && (
                    <span className="text-red-500 text-[12px]">Email is already exist</span>
                )}
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Phone"
                    className="w-[300px] h-[40px] rounded-md border border-gray-300 px-2"
                />
                {isPhoneError && (
                    <span className="text-red-500 text-[12px]">Phone is already exist</span>
                )}
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
                            onChange={(e) => setRole(e.target.value)}
                            className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white flex items-center"
                        >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"chef"}>Chef</MenuItem>
                            <MenuItem value={"cashier"}>Cashier</MenuItem>
                            <MenuItem value={"shipper"}>Shipper</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

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
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-auto h-[40px] p-2 border border-gray-300 rounded-md bg-white flex items-center"
                        >
                            <MenuItem value={"active"}>Active</MenuItem>
                            <MenuItem value={"off"}>Off</MenuItem>
                            <MenuItem value={"banned"}>Ban</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div className="flex justify-center items-center w-full gap-5">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white px-5 py-2 rounded-md"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleOpenFormUpdate}
                        className="bg-red-500 text-white px-5 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <PermissionDescriptor permissionsList={permissions} _id={_id}/>

        </div>
    );
};

export default memo(FormUpdate);
