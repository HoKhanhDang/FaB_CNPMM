import { useState } from "react";
import Input from "../../../components/commons/Input";
import { addIngredientAPI } from "../ingredient.service";
import { toast } from "react-toastify";
interface FormAddProps {
    isOpen: (value: boolean) => void;
    isRender: boolean;
    setIsRender: (value: boolean) => void;
}
const FormAdd: React.FC<FormAddProps> = ({ isOpen, setIsRender,isRender }) => {
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [unit, setUnit] = useState("");

    const handleAdd = async () => {
        const rs = await addIngredientAPI({
            name,
            stock,
            is_available: true,
            unit,
        });
        if (rs.status === 201) {
            toast.success("Add ingredient success");
            setIsRender(!isRender);
            isOpen(false);
        } else {
            toast.error("Add ingredient fail");
        }
    };

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
                    onClick={handleAdd}
                    className="bg-blue-500 text-white w-[200px] h-[40px] rounded-md"
                >
                    Add
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

export default FormAdd;
