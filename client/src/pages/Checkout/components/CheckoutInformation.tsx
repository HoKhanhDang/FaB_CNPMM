import { SearchBox } from "@mapbox/search-js-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { GetProfileById } from "../../../utils/profile/profile.util";
import TextField from "../../../components/text-field/TextField";
const token = import.meta.env.VITE_MAPBOX_TOKEN;
interface CheckoutInformationProps {}
const CheckoutInformation: React.FC<CheckoutInformationProps> = ({}) => {
    const { id } = useSelector((state: any) => state.customerSlice);
    const { data } = useQuery({
        queryKey: ["userInformation"],
        queryFn: () => GetProfileById(id),
    });

    const [information, setInformation] = useState({
        address: "",
        longitude: 0,
        latitude: 0,
        isSaveAddress: false,
    });

    useEffect(() => {
        window.localStorage.setItem(
            "lng",
            JSON.stringify(information.longitude)
        );
        window.localStorage.setItem(
            "lat",
            JSON.stringify(information.latitude)
        );
    }, [information]);

    useEffect(() => {
        if (information?.isSaveAddress) {
            window.localStorage.setItem(
                "address",
                JSON.stringify({
                    address: information.address,
                    longitude: information.longitude,
                    latitude: information.latitude,
                })
            );
        }
    }, [information]);

    useEffect(() => {
        if (window.localStorage.getItem("address")) {
            const address = JSON.parse(
                window.localStorage.getItem("address") as string
            );
            setInformation({
                ...information,
                address: address.address,
                longitude: address.longitude,
                latitude: address.latitude,
                isSaveAddress: true,
            });
        }
    }, []);

    return (
        <div className="max-sm:w-full sm:w-1/2 p-[30px] h-auto ">
            <div className="w-full h-full border rounded-[10px] p-5 bg-white">
                <span className="text-[25px] font-semibold">Information</span>
                <form id="formCheckout" className="space-y-4 pt-5">
                    <div>
                        <TextField
                            title="Full name:"
                            value={data?.fullName.toString()}
                        />
                    </div>
                    {data?.phone && (
                        <div>
                            <TextField
                                title="Phone:"
                                value={data?.phone.toString()}
                            />
                        </div>
                    )}

                    <div>
                        <TextField
                            title="Email:"
                            value={data?.email.toString()}
                        />
                    </div>
                    <div>
                        <div className="flex flex-row items-start justify-between">
                            <span className="text-sm font-medium">Note:</span>
                            <textarea
                                name="noteCheckout"
                                id="noteCheckout"
                                className="border bg-yellow-300 px-2"
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>

                        <SearchBox
                            options={{
                                proximity: {
                                    lng: 106.660172,
                                    lat: 10.762622,
                                },
                            }}
                            onRetrieve={(e) => {
                                setInformation({
                                    ...information,
                                    address:
                                        e.features[0].properties.full_address,
                                    longitude:
                                        e.features[0].properties.coordinates
                                            .longitude,
                                    latitude:
                                        e.features[0].properties.coordinates
                                            .latitude,
                                });
                            }}
                            accessToken={token}
                        />
                    </div>
                    <div>
                        <input
                            disabled
                            type="text"
                            id="addressCheckout"
                            value={information.address}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Your Address"
                        />
                    </div>

                    <div className="flex flex-row items-center justify-start gap-2">
                        <input
                            value={information.isSaveAddress.toString()}
                            onChange={() =>
                                setInformation({
                                    ...information,
                                    isSaveAddress: !information.isSaveAddress,
                                })
                            }
                            type="checkbox"
                            id="address"
                            className="block px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Your Address"
                        />
                        <span> Save this address</span>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CheckoutInformation;
