import { Router } from "express";
import {
    GetIngredientByParams,
    GetIngredientById,
    AddIngredient,
    DeleteIngredient,
    UpdateIngredient,
    GetIngredient,
} from "./ingredientController";

const router = Router();

router.get("/", GetIngredientByParams);
router.get("/:i_id", GetIngredientById);
router.post("/", AddIngredient);
router.delete("/:i_id", DeleteIngredient);
router.put("/:i_id", UpdateIngredient);

export default router;
