/**
 * This code was generated by Builder.io.
 */
import React, { useEffect, useState } from "react";
import ProfileSidebar from "./Components/ProfileSidebar";
import ProfileForm from "./Components/ProfileForm";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { GetProfileById } from "../../utils/profile/profile.util";
import OrdersForm from "./Components/OrdersForm";

const Profile: React.FC = () => {
    const [sidebar, setSidebar] = useState(1);
    const { id } = useSelector((state: any) => state.customerSlice);
    const { data } = useQuery({
        queryKey: ["Profile"],
        queryFn: () => GetProfileById(id),
    });

    const [customer, setCustomer] = React.useState({
        id: "",
        fullName: "",
        image: "",
        email: "",
        age: 0,
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (data) {
            setCustomer({
                id: data?.user_id,
                fullName: data?.fullName,
                image: data?.image,
                email: data?.email,
                age: data?.age,
                phone: data?.phone,
                address: data?.address,
            });
        }
    }, [data]);
    useEffect(() => {
        if (!id){
            window.location.href = "/auth";
        }
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full gap-5 max-md:flex-col sm:flex-row mt-[150px] justify-center items-start max-sm:px-0 sm:px-[100px]">
                <ProfileSidebar
                    sidebar={sidebar}
                    setSidebar={setSidebar}
                    name={data?.fullName}
                    imageUrl={data?.image}
                />
                {sidebar === 1 && (
                    <ProfileForm
                        customer={{
                            id: customer?.id,
                            fullName: customer?.fullName,
                            image: customer?.image,
                            email: customer?.email,
                            age: customer?.age,
                            phone: customer?.phone,
                            address: customer?.address,
                        }}
                    />
                )}
                {sidebar === 2 && <OrdersForm />}

                {}
            </div>
        </div>
    );
};

export default Profile;