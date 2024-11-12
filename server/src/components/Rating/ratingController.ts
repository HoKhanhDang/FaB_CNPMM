import { Request, Response } from "express";
import RatingService from "./rating.service";
const GetRatingByItemIDAPI = async (req: Request, res: Response) => {
    const { item_id } = req.query;
    try {
        const rs = await RatingService.GetRatingByItemIDService(
            item_id as string
        );
        if (!rs) {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({
            message: "Get rating successfully",
            data: rs,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const GetRatingByOrderIDAPI = async (req: Request, res: Response) => {
    const { order_id } = req.query;
    try {
        const rs = await RatingService.GetRatingByOrderIDService(
            order_id as string
        );
        if (!rs) {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({
            message: "Get rating successfully",
            data: rs,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const CreateRatingAPI = async (req: Request, res: Response) => {
    const { item_id, order_id, user_id, rating, comment } = req.body;

    try {
        const rs = await RatingService.CreateRatingService(
            order_id as string,
            item_id as string,
            user_id as string,
            Number(rating),
            comment as string
        );
        if (!rs) {
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({ message: "Rating created successfully" });
    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default { GetRatingByItemIDAPI, GetRatingByOrderIDAPI, CreateRatingAPI };
