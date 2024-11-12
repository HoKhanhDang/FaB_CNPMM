import Input from "../../../components/commons/Input";
import { useEffect, useState } from "react";
import SelectInput from "../../../components/commons/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import FormNutrition from "./FormNutrition";
import FormIngredients from "./FormIngredients";

import { FiImage } from "react-icons/fi";

//api
import {
    addNutritionAPI,
    getNutritionByIdAPI,
    updateNutritionAPI,
} from "../nutrition.service";
import {
    uploadImageAPI,
    addFoodAPI,
    getFoodByIdAPI,
    updateFoodAPI,
} from "../menu.service";
import {
    addListItemIngredientAPI,
    deleteAllListItemIngredientAPI,
    getIngredientByItemIdAPI,
} from "../../Ingredient/ingredient.service";
import LoadingScreen from "../../../components/commons/LoadingScreen";
import { toast } from "react-toastify";

import { IFoodDetail, IIngredients } from "../../../types/menu.interface";

interface IFormEditProps {
    setIsEdit: (value: boolean) => void;
    m_id: string;
}

const FormEdit: React.FC<IFormEditProps> = ({ setIsEdit, m_id }) => {
    const [foodDetail, setFoodDetail] = useState<IFoodDetail>();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenFormNutri, setIsOpenFormNutri] = useState(false);
    const [isOpenFormIng, setIsOpenFormIng] = useState(false);

    async function getFoodDetails(): Promise<IFoodDetail> {
        const [food, nutrition, ingredient] = await Promise.all([
            getFoodByIdAPI(m_id),
            getNutritionByIdAPI(m_id),
            getIngredientByItemIdAPI(m_id),
        ]);
        return {
            food: food?.data.data,
            nutrition: nutrition?.data.data,
            ingredients: ingredient?.data.result,
        };
    }
    useEffect(() => {
        getFoodDetails().then((data) => {
            setFoodDetail(data);
        });
    }, []);

    //validation
    const [error, setError] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
    });

    function validateData(): boolean {
        const newError = {
            title: foodDetail?.food.title === "" ? "Title is required" : "",
            price:
                foodDetail?.food.price === "" ||
                Number(foodDetail?.food.price) < 0
                    ? "Price is required"
                    : "",
            category:
                foodDetail?.food.category === "" ? "Category is required" : "",
            description:
                foodDetail?.food.description === ""
                    ? "Description is required"
                    : "",
        };

        setError(newError);
        const hasError = Object.values(newError).some(
            (errorMsg) => errorMsg !== ""
        );
        return !hasError;
    }
    ////////////////////////
    const handleConfirm = async () => {
        let id = 0;
        if (validateData()) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append(
                "image",
                selectedImage || foodDetail?.food.image || ""
            );
            const rsImage = await uploadImageAPI(formData);
            const data = {
                m_id: m_id,
                title: foodDetail?.food.title,
                price: foodDetail?.food.price,
                category: foodDetail?.food.category,
                description: foodDetail?.food.description,
                image: rsImage?.data?.data?.path || foodDetail?.food.image,
            };
            const rs = await updateFoodAPI(data);
            id = rs?.data?.data?.m_id;
        } else {
            return;
        }

        //add nutrition (optional)
        if (foodDetail?.nutrition !== null) {
            await updateNutritionAPI({ ...foodDetail?.nutrition, item_id: m_id });
        }

        //add ingredients (optional)
        if (foodDetail?.ingredients.length !== 0) {
            const rs = await deleteAllListItemIngredientAPI({ item_id: m_id });
            foodDetail?.ingredients?.forEach(async (item) => {
                await addListItemIngredientAPI({
                    item_id: m_id,
                    quantity_required: item.quantity_required,
                    ingredient_id: item.ingredient_id,
                });
            });
        }
        setIsLoading(false);
        toast.success("Add item successfully");
        setIsEdit(false);
    };

    const handleChangeCategory = (event: SelectChangeEvent) => {
        if (foodDetail) {
            setFoodDetail({
                ...foodDetail,
                food: { ...foodDetail.food, category: event.target.value },
            });
        }
        // setCategory(event.target.value);
    };
    const handeOpenFormNutri = () => {
        setIsOpenFormNutri(true);
    };
    const handleOpenFormIng = () => {
        setIsOpenFormIng(true);
    };

    //image handle
    const [selectedImage, setSelectedImage] = useState(null);
    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/") && file.size < 5000000) {
            setSelectedImage(file);
        } else {
            alert("File không hợp lệ. Chỉ chấp nhận ảnh nhỏ hơn 5MB.");
        }
    };
    const handleChangeImage = () => {
        const input = document.getElementById("image");
        input?.click();
    };
    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    return (
        <div className="fixed inset-0 z-40 bg-opacity-50 bg-white w-screen h-screen p-[100px] flex justify-center items-baseline">
            {isLoading && <LoadingScreen />}
            {isOpenFormNutri && (
                <FormNutrition
                    data={foodDetail?.nutrition}
                    handleSaveNutritionData={(data) => {
                        if (foodDetail) {
                            setFoodDetail({
                                ...foodDetail,
                                nutrition: data,
                            });
                        }
                    }}
                    setIsOpenFormNutri={setIsOpenFormNutri}
                />
            )}
            {isOpenFormIng && (
                <FormIngredients
                    item_id={m_id}
                    list={foodDetail?.ingredients}
                    handleSaveIngretionData={(data) => {
                        if (foodDetail) {
                            setFoodDetail({
                                ...foodDetail,
                                ingredients: data,
                            });
                        }
                    }}
                    setIsOpenFormIngre={setIsOpenFormIng}
                />
            )}

            <div className="bg-white w-full h-auto flex flex-row shadow-2xl rounded-md p-5">
                <div className="w-1/2 h-auto p-[75px] flex flex-col justify-center items-center gap-2">
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Avatar Preview"
                            className="rounded-[10px] w-[300px] h-[300px] object-cover"
                        />
                    )}
                    {selectedImage === null && (
                        <img
                            src={foodDetail?.food.image || ""}
                            alt="Avatar"
                            className="rounded-[10px] w-[300px] h-[300px] object-cover"
                        />
                    )}
                    <span
                        onClick={handleChangeImage}
                        className="text-blue-500 text-[15px] flex flex-row items-center gap-2 cursor-pointer hover:text-blue-100"
                    >
                        <FiImage className="text-[30px]" />
                        Change image
                    </span>
                    <input
                        onChange={handleFileChange}
                        id="image"
                        type="file"
                        className="hidden"
                    />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-start pr-[30px]">
                    <span className="text-[30px] font-bold self-center">
                        Edit Menu Item
                    </span>
                    <Input
                        value={foodDetail?.food?.title || ""}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail({
                                    ...foodDetail,
                                    food: {
                                        ...foodDetail.food,
                                        title: value,
                                    },
                                });
                            }
                        }}
                        placeholder="Item title"
                        type="text"
                        label="Title"
                        error={error.title ? true : false}
                        errorMesage={error.title}
                    />
                    <Input
                        value={foodDetail?.food.price || ""}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail({
                                    ...foodDetail,
                                    food: {
                                        ...foodDetail.food,
                                        price: value,
                                    },
                                });
                            }
                        }}
                        placeholder="Item price"
                        type="number"
                        label="Price"
                        error={error.price ? true : false}
                        errorMesage={error.title}
                    />
                    <SelectInput
                        value={foodDetail?.food.category || ""}
                        onChange={handleChangeCategory}
                        label="Category"
                        listItems={["Food", "Beverage", "Special"]}
                        id={error.category ? true : false}
                    />
                    <Input
                        value={foodDetail?.food.description || ""}
                        onChange={(value: string) => {
                            if (foodDetail) {
                                setFoodDetail({
                                    ...foodDetail,
                                    food: {
                                        ...foodDetail.food,
                                        description: value,
                                    },
                                });
                            }
                        }}
                        placeholder="Item description"
                        type="text"
                        label="Description"
                        multiline
                        error={error.description ? true : false}
                        errorMesage={error.title}
                    />

                    <div className="flex flex-row justify-center items-center gap-2 w-full">
                        <button
                            onClick={handleOpenFormIng}
                            className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                        >
                            Add Ingredients
                        </button>
                        <button
                            onClick={handeOpenFormNutri}
                            className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                        >
                            Add Nutrition
                        </button>
                    </div>
                    <button
                        onClick={handleConfirm}
                        className="bg-blue-500 w-full text-white p-2 rounded-md hover:bg-blue-400"
                    >
                        Confirm
                    </button>
                </div>
            </div>
            <div
                onClick={() => setIsEdit(false)}
                className="text-red-600 text-[50px] absolute top-5 right-10 hover:text-red-200 cursor-pointer"
            >
                X
            </div>
        </div>
    );
};
export default FormEdit;
