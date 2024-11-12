import Rating from "./rating.model";
import { ObjectId } from "mongodb";

const GetRatingByOrderIDService = async (order_id: string) => {
    try {
        const result = await Rating.find({ order_id: new ObjectId(order_id) })
            .populate({
                path: "user_id",
                select: "fullName",
                model: "User",
                localField: "user_id",
                foreignField: "user_id",
            })
            .select("comment created_at rating");
        return result;
    } catch (error) {
        throw new Error(`Error fetching rating by order ID: ${error}`);
    }
};

// Get ratings by Item ID
const GetRatingByItemIDService = async (item_id: string) => {
    try {
        const result = await Rating.find({ item_id })
            .populate({
                path: "user_id",
                select: "fullName",
                model: "User",
                localField: "user_id",
                foreignField: "user_id",
            })
            .select("comment created_at rating"); // Select only the relevant fields from Rating
        return result;
    } catch (error) {
        throw new Error(`Error fetching rating by item ID: ${error}`);
    }
};

// Create a new rating
const CreateRatingService = async (
    order_id: string,
    item_id: string,
    user_id: string,
    rating: number,
    comment: string
) => {
    try {
        const newRating = new Rating({
            item_id: new ObjectId(item_id),
            order_id: new ObjectId(order_id),
            user_id: new ObjectId(user_id),
            rating,
            comment,
            isRating: true,
        });
        const result = await newRating.save();
        return result;
    } catch (error) {
        throw new Error(`Error creating rating: ${error}`);
    }
};

export default {
    GetRatingByOrderIDService,
    GetRatingByItemIDService,
    CreateRatingService,
};
