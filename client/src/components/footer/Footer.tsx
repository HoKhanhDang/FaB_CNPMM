import React from "react";
import BranchCard from "./BranchCard";

interface BranchInfo {
    name: string;
    address: string;
    hours: string;
    phone: string;
}

const branchData: BranchInfo[] = [
    {
        name: "Robert Food",
        address: "1986 Hilltop DriveBorger, TX 79007",
        hours: "7.30 AM - 9.30 PM",
        phone: "+880 1630-225015",
    },
    {
        name: "Mark A. Reed Food",
        address: "4877 Rose AvenueNew Orleans, LA 70112",
        hours: "7.30 AM - 9.30 PM",
        phone: "+880 1630-225015",
    },
    {
        name: "Karie K. Hill Food",
        address: "1509 Peaceful LaneCleveland, OH 44115",
        hours: "7.30 AM - 9.30 PM",
        phone: "+880 1630-225015",
    },
];

const Footer: React.FC = () => {
    return (
        <main className="flex flex-col w-full bg-main text-black pt-5">
            <div className="h-[100px] flex items-center justify-center">
                <h1 className="self-center text-4xl font-bold text-black">
                    Our Branch
                </h1>
            </div>{" "}
            
            <section className="flex flex-col items-center px-8 py-8 bg-red-600">
                <div className="flex flex-wrap justify-center w-full gap-7">
                    {branchData.map((branch, index) => (
                        <BranchCard key={index} {...branch} />
                    ))}
                </div>
            </section>
            <footer className="flex items-center justify-center py-4 bg-gray-900 text-gray-300 text-lg">
                <p>Copyright © 2024 | Hephaestus</p>
            </footer>
        </main>
    );
};

export default Footer;
