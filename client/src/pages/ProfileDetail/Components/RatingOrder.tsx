import React, { useState, FC, useEffect } from "react";
import { TbBackspaceFilled } from "react-icons/tb";
import { GetRatingByOrderID, PostRating } from "../../../utils/rating/rating.util";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

interface RatingComponentProps {
    setIsOpenRating: (value: boolean) => void;
    order_id: string;
    orderItems: any;
}
const RatingComponent: FC<RatingComponentProps> = ({
    setIsOpenRating,
    order_id,
    orderItems
}) => {
    const { id } = useSelector((state: any) => state.customerSlice);

    const [rating, setRating] = useState<number>(0); // State for storing the star rating
    const [hover, setHover] = useState<number>(0); // State for showing hover effect on stars
    const [comment, setComment] = useState<string>(""); // State for storing the comment
    const [isRating, setIsRating] = useState<boolean>(true);

    const fetchData = async () => {
        const data = await GetRatingByOrderID(order_id);
        const {rating, comment} = data[0];
        if (data.length === 0) {
            return;
        } else {
            setRating(rating);
            setComment(comment);
            setIsRating(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Call the API to submit the rating
        orderItems.forEach(async (item: any) => {
            const rs = await PostRating({
                item_id: item.item_id,
                order_id: order_id,
                user_id: id,
                rating,
                comment,
            });
            if (rs.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Thank you for your feedback!",
                }).then(() => {
                    setIsOpenRating(false);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        });
      
    };

    return (
        <div className="animate__animated animate__backInUp relative max-sm:w-full max-sm:mx-2 sm:w-1/2  h-auto p-6  bg-white z-50 rounded-lg shadow-md">
            <div
                onClick={() => setIsOpenRating(false)}
                className="top-5 right-5 absolute"
            >
                <TbBackspaceFilled className="text-red-50 hover:text-red-500 text-[50px]" />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Rate Our Service
            </h2>

            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`text-[40px] ${
                                index <= (hover || rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                            disabled={!isRating}
                        >
                            &#9733;
                        </button>
                    );
                })}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <textarea
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="Write your comment..."
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!isRating}
                />

                <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black border hover:text-white font-semibold py-2 rounded-md transition duration-300"
                    disabled={rating === 0 || comment?.trim() === "" || !isRating}
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default RatingComponent;
