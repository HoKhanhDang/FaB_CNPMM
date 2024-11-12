import { Router } from "express";
import {
  GetIngredientByParams,
  GetIngredientById,
  AddIngredient,
  DeleteIngredient,
  GetSumIngredientByParams,
  UpdateIngredient,
  GetIngredient,
} from "./ingredientController";

const router = Router();
//Collection Ingredients
router.get("/sum", GetSumIngredientByParams); //Lấy toàn bộ số lượng item theo params
router.get("/", (req, res) => {
  const { page } = req.query; //Neu query có tham số là page
  if (page) {
    return GetIngredientByParams(req, res); //Có tham số page
  } else {
    return GetIngredient(req, res); //Không tham số page
  }
});


router.get("/:i_id", GetIngredientById); //GET Theo _id
router.post("/", AddIngredient);
router.delete("/:i_id", DeleteIngredient);
router.put("/:i_id", UpdateIngredient);

export default router;
