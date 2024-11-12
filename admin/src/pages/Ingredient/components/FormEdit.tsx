import React, { useEffect, useState } from "react";
import Input from "../../../components/commons/Input";
import { getIngredientByIDAPI, editIngredientAPI } from "../ingredient.service";
import { toast } from "react-toastify";

interface FormEditProps {
    isOpen: (value: boolean) => void;
    i_id: string;
}
const FormEdit: React.FC<FormEditProps> = ({ isOpen, i_id }) => {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [unit, setUnit] = useState("");

    const fetchData = async () => {
        const rs = await getIngredientByIDAPI(i_id);
        setName(rs?.data?.result?.name);
        setStock(rs?.data?.result?.stock);
        setUnit(rs?.data?.result?.unit);
    };

    const handleEdit = async () => {
        const rs = await editIngredientAPI({
            i_id,
            name,
            stock,
            is_available: true,
            unit,
        });
        if (rs.status === 200) {
            toast.success("Edit ingredient success");
            isOpen(false);
        } else {
            toast.error("Edit ingredient fail");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="fixed inset-0 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline">
            <div className="bg-white w-1/2 h-auto shadow-2xl rounded-md p-[20px] flex  flex-col gap-5 justify-start items-center relative">
                <span className="text-[30px] font-bold">Add Ingredient</span>
                <Input
                    label="Name"
                    placeholder="Name"
                    value={name}
                    onChange={setName}
                    error={false}
                />
                <Input
                    type="number"
                    label="Stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={setStock}
                    error={false}
                />
                <Input
                    label="Unit"
                    placeholder="Kg,gram,... "
                    value={unit}
                    onChange={setUnit}
                    error={false}
                />
                <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white w-[200px] h-[40px] rounded-md"
                >
                    Confirm
                </button>
                <div
                    onClick={() => isOpen(false)}
                    className="text-red-600 text-[30px] absolute top-5 right-5 hover:text-red-200"
                >
                    X
                </div>
            </div>
        </div>
    );
};

export default FormEdit;
