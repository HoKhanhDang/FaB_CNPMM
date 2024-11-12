import { Router } from "express";

import { AddNutrition, GetNutrition, UpdateNutrition } from "./nutriController";
const router = Router();

router.get("/:item_id", GetNutrition);
router.post("/", AddNutrition);
router.put("/:item_id", UpdateNutrition);

export default router;