import React, { useEffect, useState } from "react";
import { GetRatingByItemID } from "../../../../utils/rating/rating.util";
import FormatDay from "../../../../utils/common/FormatDay";
interface FoodRatingProps {
    item_id: string;
}

const FoodRating: React.FC<FoodRatingProps> = ({ item_id }) => {
    const [rating, setRating] = useState<
        {
            user_id: {
                fullName: string;
            };
            created_at: string;
            comment: string;
            rating: number;
        }[]
    >([]);
    const [overallRating, setOverallRating] = useState<number>(0);
    const fetchRating = async () => {
        // Call the API to get the rating
        const rs = await GetRatingByItemID(item_id);
        setRating(rs);
        setOverallRating(
            rs.reduce((acc: number, cur: any) => acc + cur.rating, 0) /
                rs.length
        );
        if (rs.status === 200) {
            return rs.data;
        } else {
            return null;
        }
    };
    useEffect(() => {
        fetchRating();
    }, []);

    return (
        <div className="w-full">
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Overall Rating</h2>
                <p className="text-2xl font-bold text-yellow-500">
                    {overallRating ? overallRating : 0} / 5
                </p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                {rating?.map(
                    (
                        comment: {
                            user_id: {
                                fullName: string;
                            };
                            created_at: string;
                            comment: string;
                            rating: number;
                        },
                        index: number
                    ) => (
                        <div
                            key={index}
                            className="p-2 mb-3 bg-gray-100 rounded-lg shadow-sm max-md:max-w-[70vw]"
                        >
                            <div className="flex justify-between gap-2">
                                <span className="font-bold truncate">
                                    {comment.user_id.fullName}
                                </span>
                                <span className="text-sm text-gray-500 shrink-0">
                                    {FormatDay(comment.created_at)}
                                </span>
                            </div>
                            <p className="text-gray-800 line-clamp-2">
                                {comment.comment}
                            </p>
                            <div className="text-yellow-400 text-sm">
                                {Array.from(
                                    { length: comment.rating },
                                    (_, i) => (
                                        <span key={i}>&#9733;</span> // Star symbol
                                    )
                                )}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default FoodRating;
