import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "./types";

interface ProductListProps {
    products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <section className="px-16 py-4 w-full max-md:px-5 max-md:max-w-full">
            <div className="grid grid-cols-6 gap-4 text-2xl text-orange-50 bg-red-600">
                <div className="col-span-1 py-2">Product</div>
                <div className="col-span-1 py-2">Product Name</div>
                <div className="col-span-1 py-2">Unit Price</div>
                <div className="col-span-1 py-2">Quantity</div>
                <div className="col-span-1 py-2">Total</div>
                <div className="col-span-1 py-2">Action</div>
            </div>

            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </section>
    );
};

export default ProductList;
