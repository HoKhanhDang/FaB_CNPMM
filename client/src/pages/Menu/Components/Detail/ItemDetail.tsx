import FormatCurrency from "../../../../utils/common/FormatCurrency";
import { addItem } from "../../../../redux/slice/cart.slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { getFoodNutrition } from "../../../../utils/nutri/nutri.util";
import { INutrition } from "../../../../types/INutrition";
import NutritionShow from "./NutritionShow";
import DropdownItemMenu from "./DropdownReview";
import { FaCartShopping } from "react-icons/fa6";

interface ItemDetailProps {
    title: string;
    detail: string;
    image: string;
    id: string;
    price: number;
    availability: boolean;
}
const ItemDetail: React.FC<ItemDetailProps> = ({
    detail,
    image,
    price,
    id,
    title,
    availability,
}) => {
    const dispatch = useDispatch();

    const { data } = useQuery({
        queryKey: ["menu", id],
        queryFn: () =>
            getFoodNutrition({
                item_id: id,
            }),
    });
    const handleAddToCart = () => {
        dispatch(
            addItem({
                id,
                title,
                price: Number(price),
                quantity: 1,
                total: Number(price),
                image,
            })
        );
        toast.success("Add to cart successfully");
    };
    return (
        <>
            <div className="flex max-sm:flex-col sm:flex-row w-full h-auto md:px-[100px]">
                <div className="max-sm:w-full sm:w-1/2 h-full p-[50px]">
                    <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-sm:w-full sm:w-1/2 flex flex-col justify-center items-center p-5 gap-5">
                    <span className="text-[18px] font-normal p-5">
                        {detail}
                    </span>

                    <NutritionShow data={data as INutrition} />
                    <div className="text-[40px] font-semibold ">
                        {FormatCurrency(price)}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!availability}
                        className={` ${
                            availability ? "bg-red-500" : "bg-red-500/50"
                        } group gap-[30px] text-white transform_z cursor-pointer rounded-xl flex justify-center items-center h-[50px] w-1/2`}
                    >
                        {availability ? "Add to cart" : "Not available now"} 
                        <FaCartShopping className="ml-2 text-[30px] group-hover:animate-wobble-hor-bottom " />
                    </button>
                </div>
            </div>
            <DropdownItemMenu item_id={id} />
        </>
    );
};
export default ItemDetail;
