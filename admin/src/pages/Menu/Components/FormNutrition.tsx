import { useEffect, useState } from "react";
import Input from "../../../components/commons/Input";
import { updateNutritionAPI } from "../nutrition.service";
import { toast } from "react-toastify";
import { getNutritionByID } from "../../../utils/Nutrition/nutrition.utils";

interface FormNutritionProps {
    setIsOpenFormNutri: (value: boolean) => void;
    handleSaveNutritionData?: (data: any) => void;
    data?: any;
    id?: string;
    caloriesProps?: string;
    proteinProps?: string;
    fatProps?: string;
    carbohydrateProps?: string;
    isEdit?: boolean;
}

const FormNutrition: React.FC<FormNutritionProps> = ({
    setIsOpenFormNutri,
    handleSaveNutritionData,
    id,
    caloriesProps,
    proteinProps,
    fatProps,
    carbohydrateProps,
    data,
    isEdit,
}) => {
    const [calories, setCalories] = useState(caloriesProps || "");
    const [protein, setProtein] = useState(proteinProps || "");
    const [fat, setFat] = useState(fatProps || "");
    const [carbohydrate, setCarbohydrate] = useState(carbohydrateProps || "");
    const [nutritional_info_id, setNutritional_info_id] = useState(
        data?.nutritional_info_id || 0
    );

    const handleSave = async () => {
        if (isEdit) {
            //edit data
            const res = await updateNutritionAPI({
                item_id: id,
                calories,
                proteins: protein,
                fats: fat,
                carbs: carbohydrate,
            });
            if (res.status === 200) {
                toast("Edit success");
            } else {
                toast("Edit failed");
            }
            setIsOpenFormNutri(false);
            return;
        }
        if (handleSaveNutritionData) {
            handleSaveNutritionData({
                nutritional_info_id: id,
                calories,
                proteins: protein,
                fats: fat,
                carbs: carbohydrate,
            });
        }
        setIsOpenFormNutri(false);
    };

    useEffect(() => {
        if (data) {
            setCalories(data.calories);
            setProtein(data.proteins);
            setFat(data.fats);
            setCarbohydrate(data.carbs);
        }
        if (id) {
            //get data
            const rs = getNutritionByID(id).then((res) => {
                setNutritional_info_id(res?.nutritional_info_id);
                setCalories(res?.calories.toString());
                setProtein(res?.proteins.toString());
                setFat(res?.fats.toString());
                setCarbohydrate(res?.carbs.toString());
            });
        }
    }, []);
    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-center">
            <div className=" relative bg-white w-1/3 h-auto flex gap-3 flex-col shadow-2xl rounded-md p-5">
                <div
                    onClick={() => setIsOpenFormNutri(false)}
                    className="hover:text-red-500 cursor-pointer absolute top-0 right-5 text-[30px] text-red font-bold"
                >
                    X
                </div>

                <span className="text-[25px] font-bold text-center">
                    Nutrition
                </span>
                <Input
                    value={calories}
                    onChange={setCalories}
                    placeholder="kcal"
                    type="number"
                    label="Calories"
                    error={false}
                />
                <Input
                    value={protein}
                    onChange={setProtein}
                    placeholder="gram"
                    type="number"
                    label="Protein"
                    error={false}
                />
                <Input
                    value={fat}
                    onChange={setFat}
                    placeholder="gram"
                    type="number"
                    label="Fat"
                    error={false}
                />
                <Input
                    value={carbohydrate}
                    onChange={setCarbohydrate}
                    placeholder="gram"
                    type="number"
                    label="Carbohydrate"
                    error={false}
                />
                <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default FormNutrition;
