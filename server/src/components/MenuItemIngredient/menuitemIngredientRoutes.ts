import { Router } from "express";
import {
  AddIngredientToMenu,
  RemoveIngredientFromMenu,
  UpdateIngredientFromMenu,
  GetIngredientsFromMenu,
  DeleteAllIngredientsFromMenu,
} from "./menuitemIngredientController";

const router = Router();

//Collection MenuItemIngredients
router.get("/:item_id", GetIngredientsFromMenu); //get by query of item_id
router.post("/", AddIngredientToMenu);
router.put("/:menu_item_ingredient_id", UpdateIngredientFromMenu);
router.delete("/all/:item_id", DeleteAllIngredientsFromMenu);
router.delete("/:menu_item_ingredient_id", RemoveIngredientFromMenu);

export default router;
