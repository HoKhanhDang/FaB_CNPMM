import { Request, Response } from "express";

import {
    AddIngredientToMenuService,
    RemoveIngredientFromMenuService,
    UpdateIngredientFromMenuService,
    GetIngredientFromMenuService,
    DeleteAllIngredientsFromMenuService,
} from "./menuitemIngredient.service";

//menuitemingredients
const AddIngredientToMenu = async (req: Request, res: Response) => {
    const { item_id, ingredient_id, quantity_required } = req.body;
    if (!item_id || !ingredient_id || !quantity_required) {
        return res
            .status(400)
            .json({ message: "Ingredient id and Menu id is required" });
    }
    try {
        const result = await AddIngredientToMenuService({
            item_id: item_id as string,
            ingredient_id: ingredient_id as string,
            quantity_required: Number(quantity_required),
        });
        return res
            .status(201)
            .json({ message: "Ingredient added to menu successfully", result });
    } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                code: "ER_DUP_ENTRY",
                message: "Ingredient already exists",
            });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

const UpdateIngredientFromMenu = async (req: Request, res: Response) => {
    const { quantity_required } = req.body;
    const { menu_item_ingredient_id } = req.params;
    if (!menu_item_ingredient_id || !quantity_required) {
        return res.status(400).json({
            message:
                "Menu item ingredient id and quantity required is required",
        });
    }
    try {
        const result = await UpdateIngredientFromMenuService({
            menu_item_ingredient_id: menu_item_ingredient_id as string,
            quantity_required: Number(quantity_required),
        });
        return res.status(200).json({
            message: "Ingredient updated in menu successfully",
            result,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const GetIngredientsFromMenu = async (req: Request, res: Response) => {
    const item_id = req.params.item_id;
    if (!item_id) {
        return res.status(400).json({ message: "Item id is required" });
    }
    try {
        const result = await GetIngredientFromMenuService({
            item_id: item_id as string,
        });
        return res
            .status(200)
            .json({ message: "Ingredients fetched successfully", result });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const RemoveIngredientFromMenu = async (req: Request, res: Response) => {
    const { menu_item_ingredient_id } = req.params;
    if (!menu_item_ingredient_id) {
        return res
            .status(400)
            .json({ message: "Menu item ingredient id is required" });
    }
    try {
        const result = await RemoveIngredientFromMenuService(
            menu_item_ingredient_id
        );
        return res.status(200).json({
            message: "Ingredient removed from menu successfully",
            result,
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
const DeleteAllIngredientsFromMenu = async (req: Request, res: Response) => {
    const { item_id } = req.params;
    if (!item_id) {
        return res.status(400).json({ message: "Item id is required" });
    }
    try {
        const result = await DeleteAllIngredientsFromMenuService({
            item_id: item_id as string,
        });

        return res
            .status(200)
            .json({ message: "Ingredients deleted all successfully", result });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

export {
    AddIngredientToMenu,
    RemoveIngredientFromMenu,
    UpdateIngredientFromMenu,
    GetIngredientsFromMenu,
    DeleteAllIngredientsFromMenu,
};
