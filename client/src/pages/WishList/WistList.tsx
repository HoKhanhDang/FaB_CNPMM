import React from "react";
import HeroSection from "./components/HeroSection";
import ProductList from "./components/ProductList";
import { Product } from "./components/types";
const products: Product[] = [
    {
        id: "1",
        name: "Belgium waffles with strawberries",
        price: 150,
        quantity: 1,
        total: 150,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/65fda94b799cf9cef403b0c5fff6eee128578d76dadfa368c7c8f612f698d33e?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    },
    {
        id: "2",
        name: "Chicken skewers",
        price: 150,
        quantity: 2,
        total: 300,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/12994ccd704ea1eb2bce62fc060db6a9d9df2c5662b1dfc9a8e388bcdbfbb8b9?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    },
    {
        id: "3",
        name: "Hamburger Burger with Beef",
        price: 150,
        quantity: 1,
        total: 150,
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d29f8242e80dd8bde5d3affb925155a13287e74744d187688bd2e62000489140?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
    },
];

const WistList: React.FC = () => {
    return (
        <main className="flex flex-col items-center">
            <HeroSection />
            <div className="flex flex-col items-center lg:px-0 px-[30px]">
                <ProductList products={products} />
            </div>
        </main>
    );
};

export default WistList;
