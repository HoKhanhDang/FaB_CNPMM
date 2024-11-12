import { Router } from "express";
const router = Router();

import RatingController from "../Rating/ratingController";
//rating
router.get("/item", RatingController.GetRatingByItemIDAPI);
router.get("/order", RatingController.GetRatingByOrderIDAPI);
router.post("/", RatingController.CreateRatingAPI);

export default router;