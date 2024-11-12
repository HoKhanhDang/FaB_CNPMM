/**
 * This code was generated by Builder.io.
 */
import React from "react";
import ContactInfo from "./ContactInfo";
import SocialIcon from "./SocialIcon";

const ContactSection: React.FC = () => {
    const contactInfos = [
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac1f1b8db854332e911bb1ba4e9e31a519a24a3aaa99d321304af40e1fe98e35?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            text: "28 Seventh Avenue, Neew York, 10014",
            altText: "Location icon",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a10b31f886dec98158d429b39e2000b7ef9ca23528165fbf3737aa8da07ccade?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            text: "+880 1630 225 015",
            altText: "Phone icon",
        },
        {
            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a2717b3c03a4ce031008cb2a9c5c5fe8c8a7b537b651cab45d8fdacdf9d9e93b?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            text: "resturents@gmail.com",
            altText: "Email icon",
        },
    ];

    const socialIcons = [
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a08983926a528231476757843e558c6967c23b85c3fc1757b2b4187309b9b6f0?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            alt: "Facebook icon",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/33d358edf6f161988240fd9cdb26860d8b997f81a5f9e341dd34535de5bc1fb2?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            alt: "Twitter icon",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c53942795bdbb8ddf6b8c04daeeab169122984bab8078999c53c37b5ebceeb0?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            alt: "Instagram icon",
        },
        {
            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/65319ce694878da0b341dbd6a3c83964eae05793c9549ff17fc3eb52c349f2ed?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109",
            alt: "LinkedIn icon",
        },
    ];

    return (
        <section className="w-full md:px-[100px] py-[50px]">
            <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-start w-full max-md:mt-10">
                        <h2 className="text-4xl font-bold text-center text-red-600">
                            ADDRESS
                        </h2>
                        <div className="flex flex-col items-start self-stretch pl-3.5 mt-3 w-full text-lg text-slate-700">
                            {contactInfos.map((info, index) => (
                                <ContactInfo  key={index} {...info} />
                            ))}
                        </div>
                        <h2 className="mt-11 text-4xl font-bold text-red-600 max-md:mt-10">
                            WORKING HOURS
                        </h2>
                        <div className="flex gap-4 self-center mt-4 max-w-full text-lg text-red-600 w-[292px]">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0debe41be82699d9d8ff3184f8d669593f7a8b55a5378268bc9b51ca876a3dc?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                                alt="Clock icon"
                                className="object-contain shrink-0 my-auto w-4 aspect-square fill-red-600"
                            />
                            <div className="flex-auto w-[258px]">
                                7:30 am to 9:30pm on Weekdays
                            </div>
                        </div>
                        <h2 className="mt-9 text-4xl font-bold text-red-600">
                            FOLLOW US
                        </h2>
                        <div className="flex gap-10 mt-5">
                            {socialIcons.map((icon, index) => (
                                <SocialIcon key={index} {...icon} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
                    <div className="flex relative flex-col grow py-48 pr-16 pl-24 text-xs whitespace-nowrap min-h-[391px] text-slate-700 max-md:px-5 max-md:py-24 max-md:mt-10 max-md:max-w-full">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1ad764f594eebd4f0b6f4884e436a6b6ca41d1f9d0e76f69054663628af5082d?placeholderIfAbsent=true&apiKey=e0522cabc7bc4885906fcb2658eca109"
                            alt="Restaurant background"
                            className="object-cover absolute inset-0 size-full"
                        />
                        <span className="relative z-10">Resturents</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;