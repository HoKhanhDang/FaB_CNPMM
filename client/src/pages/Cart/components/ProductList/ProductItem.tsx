import React, { useEffect } from "react";
import { ICartItem } from "../../../../types/ICartItem";
import QuantityControl from "../QuantityControl";
import { FaTrash } from "react-icons/fa";
import { changeQuantity, removeItem } from "../../../../redux/slice/cart.slice";
import { useDispatch } from "react-redux";
interface ProductItemProps {
    product: ICartItem;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const [quantity, setQuantity] = React.useState(product.quantity);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeQuantity({ id: product.id, quantity }));
    }, [quantity]);
    const handleDelete = () => {
        dispatch(removeItem(product.id));
    };

    return (
        <>
            <div className="max-sm:hidden sm:grid grid-cols-6 items-center gap-4 bg-white rounded-lg shadow-lg p-4 my-2 hover:shadow-2xl">
                <div className="flex justify-start col-span-1">
                    <img
                        loading="lazy"
                        src={product.image}
                        alt={product.title}
                        className="object-contain rounded-lg max-w-full w-[100px] h-[100px]"
                    />
                </div>

                <div className="text-left col-span-1 text-xl font-semibold text-slate-800">
                    {product.title}
                </div>

                <div className="text-start col-span-1 text-lg font-medium text-gray-600">
                    ${product.price}
                </div>

                <QuantityControl
                    setQuantity={setQuantity}
                    quantity={quantity}
                />

                <div className="text-start col-span-1 text-lg font-bold text-slate-800">
                    ${product.price * quantity}
                </div>
                <div className="flex justify-start col-span-1">
                    <FaTrash
                        onClick={handleDelete}
                        className="text-[45px] hover:text-red-200 px-3 py-1 text-red-500 rounded-lg"
                    />
                </div>
            </div>

            <div className="max-sm:flex sm:hidden flex-row justify-center items-center border rounded-[30px] w-full pl-[30px] pr-[70px] py-[10px]">
                <div className="flex flex-row items-center justify-center w-1/2">
                    <img
                        loading="lazy"
                        src={product.image}
                        alt={product.title}
                        className="object-contain rounded-lg max-w-full w-[100px] h-[100px]"
                    />
                </div>
                <div className="flex flex-col items-start justify-center w-1/2">
                    <div className="text-[15px] text-start font-semibold text-slate-800">
                        {product.title}
                    </div>
                    <div className="text-lg text-start font-medium text-gray-600">
                        ${product.price}
                    </div>

                    <div className="flex flex-row justify-between items-center gap-2">
                        <QuantityControl
                            setQuantity={setQuantity}
                            quantity={quantity}
                        />

                        <FaTrash
                            onClick={handleDelete}
                            className="text-[45px] hover:text-red-200 px-3 py-1 text-red-500 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductItem;
