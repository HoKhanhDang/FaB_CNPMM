import React from "react";
import { Product } from "./types";

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    return (
        <div className="grid grid-cols-6 items-center gap-4 bg-white rounded-lg shadow-lg p-4">
            {/* Product Image */}
            <div className="flex justify-start col-span-1">
                <img
                    loading="lazy"
                    src={product.image}
                    alt={product.name}
                    className="object-contain rounded-lg max-w-full w-[100px] h-[100px]"
                />
            </div>

            {/* Product Name */}
            <div className="text-left col-span-1 text-xl font-semibold text-slate-800">
                {product.name}
            </div>

            {/* Unit Price */}
            <div className="text-start col-span-1 text-lg font-medium text-gray-600">
                ${product.price}
            </div>

            {/* Quantity and Controls */}
            <div className="flex justify-start items-start gap-4 col-span-1">
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded-lg"
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <div className="text-lg font-semibold">{product.quantity}</div>
                <button
                    className="px-3 py-1 bg-green-600 text-white rounded-lg"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>

            {/* Total Price */}
            <div className="text-start col-span-1 text-lg font-bold text-slate-800">
                ${product.total}
            </div>

            {/* Remove Button */}
            <div className="flex justify-start col-span-1">
                <button
                    className="px-3 py-1 bg-red-600 text-white rounded-lg"
                    aria-label="Remove item"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ProductItem;
