import React, { useEffect, useState } from "react";
import { permissions } from "../../../constant/permission.constant";
import { updatePermissionAPI } from "../staff.service";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface PermissionDescriptorProps {
    _id: number;
    permissionsList: string[];
}

const PermissionDescriptor: React.FC<PermissionDescriptorProps> = ({ _id ,permissionsList}) => {
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
        []
    );

    const handleCheckboxChange = (permission: string) => {
        setSelectedPermissions((prevSelectedPermissions) => {
            if (prevSelectedPermissions.includes(permission)) {
                return prevSelectedPermissions.filter((p) => p !== permission);
            } else {
                return [...prevSelectedPermissions, permission];
            }
        });
    };

    const handleChangePermission = async () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updatePermissionAPI({
                    user_id: _id,
                    permission: selectedPermissions,
                });
                toast.success("Update permission successfully");
            }
        });
    };
    useEffect(() => {
        setSelectedPermissions(permissionsList || []);
    }, [permissionsList]);

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="!opacity-100 flex flex-col justify-center items-center w-1/3 h-2/3 bg-white p-5 rounded-lg z-50 gap-[20px]"
        >
            <span className="text-[20px] font-bold">Permissions</span>
            <div className="grid grid-cols-2 grid-row-5 gap-5">
                {permissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedPermissions ? selectedPermissions?.includes(permission):false}
                            onChange={() => handleCheckboxChange(permission)}
                        />
                        {permission}
                    </label>
                ))}
            </div>
            <button
                onClick={handleChangePermission}
                className="bg-blue-500 w-1/2 text-white p-2 rounded-md"
            >
                Save
            </button>
        </div>
    );
};

export default PermissionDescriptor;
