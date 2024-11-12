import React from "react";
// import ContactSection from "./Components/ContactSection";
import HeroSection from "../../components/top-title/HeroSection";
import layoutService from "../../utils/layout/layout.service";
import { useQuery } from "@tanstack/react-query";
import JSXParser from "react-jsx-parser";

const Contact: React.FC = () => {
    const fetchLayout = async () => {
        const response = await layoutService.apiGetLayout("contact");

        return response.data.result;
    };
    const { data } = useQuery({
        queryKey: ["layout", "contact"],
        queryFn: () => fetchLayout(),
    });
    return (
        <main className="flex flex-col items-center">
            <HeroSection
                title="Contact"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius mod tempor incididunt ut labore et dolore magna"
            />
            {/* <div className="flex flex-col items-center lg:px-0 px-[30px]">
                <ContactSection />
            </div> */}
            {data &&
                data.map((item: any, index: number) => (
                    <JSXParser
                        key={index}
                        jsx={item.code}
                        bindings={{}}
                        components={{}}
                        renderInWrapper={false}
                    />
                ))}
        </main>
    );
};

export default Contact;
