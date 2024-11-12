import { Request, Response } from "express";
import {
    AddNutritionService,
    GetNutritionService,
    UpdateNutritionService,
} from "./nutri.service";

// Lấy thông tin dinh dưỡng theo item_id
const GetNutrition = async (req: Request, res: Response) => {
    const item_id = req.params.item_id;
    if (!item_id) {
        return res.status(400).json({ message: "Item id is required" });
    }
    try {
        const result = await GetNutritionService(item_id);
        return res.status(200).json({ message: "Nutrition fetched successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// Thêm thông tin dinh dưỡng
const AddNutrition = async (req: Request, res: Response) => {
    const { item_id, calories, carbs, proteins, fats } = req.body; // Sử dụng req.body
    if (item_id === undefined || calories === undefined || carbs === undefined || proteins === undefined || fats === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const result = await AddNutritionService({
            item_id: item_id ,
            calories: Number(calories),
            carbs: Number(carbs),
            proteins: Number(proteins),
            fats: Number(fats),
        });
        return res.status(201).json({ message: "Nutrition added successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

// Cập nhật thông tin dinh dưỡng
const UpdateNutrition = async (req: Request, res: Response) => {
    const {item_id} = req.params;
    const { calories, carbs, proteins, fats } = req.body; // Sử dụng req.body
    if (item_id === undefined || calories === undefined || carbs === undefined || proteins === undefined || fats === undefined) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const result = await UpdateNutritionService({
            nutritional_info_id: item_id, // Giữ nguyên kiểu là string
            calories: Number(calories),
            carbs: Number(carbs),
            proteins: Number(proteins),
            fats: Number(fats),
        });
        return res.status(200).json({ message: "Nutrition updated successfully", data: result });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
};

export { GetNutrition, AddNutrition, UpdateNutrition };