import {
    MenuItemIngredient,
    IMenuItemIngredient,
} from "./menuitemIngredient.model";

// Thêm nguyên liệu vào menu
const AddIngredientToMenuService = async (ingredient: {
    item_id: string; // Đổi item_id thành string
    ingredient_id: string; // Đổi ingredient_id thành string
    quantity_required: number;
}): Promise<IMenuItemIngredient> => {
    const newIngredient = new MenuItemIngredient(ingredient);
    try {
        return await newIngredient.save();
    } catch (err) {
        throw new Error(`Error adding ingredient to menu: ${err}`);
    }
};

// Xóa nguyên liệu khỏi menu theo ID
const RemoveIngredientFromMenuService = async (
    menu_item_ingredient_id: string
): Promise<IMenuItemIngredient | null> => {
    try {
        return await MenuItemIngredient.findOneAndDelete({
            menu_item_ingredient_id,
        });
    } catch (err) {
        throw new Error(`Error removing ingredient from menu: ${err}`);
    }
};

// Cập nhật số lượng nguyên liệu trong menu
const UpdateIngredientFromMenuService = async (ingredient: {
    menu_item_ingredient_id: string; // Đổi menu_item_ingredient_id thành string
    quantity_required: number;
}): Promise<IMenuItemIngredient | null> => {
    try {
        return await MenuItemIngredient.findOneAndUpdate(
            { menu_item_ingredient_id: ingredient.menu_item_ingredient_id },
            { quantity_required: ingredient.quantity_required },
            { new: true }
        );
    } catch (err) {
        throw new Error(`Error updating ingredient from menu: ${err}`);
    }
};

// Lấy nguyên liệu từ menu theo item_id
const GetIngredientFromMenuService = async (ingredient: {
    item_id: string; // item_id là string
}): Promise<any[]> => {
    try {
        // Truy vấn và populate các trường cần thiết từ menuitemingredients và ingredients
        return await MenuItemIngredient.find({
            item_id: ingredient.item_id,
        }).populate({
            path: "ingredient_id",
            select: "name",
            model: "Ingredient",
            localField: "ingredient_id",
            foreignField: "ingredient_id",
        }).select("ingredient_id item_id quantity_required"); // Lấy các trường cần thiết từ menuitemingredients
    } catch (err) {
        throw new Error(`Error fetching ingredients from menu: ${err}`);
    }
};

// Xóa tất cả nguyên liệu khỏi menu theo item_id
const DeleteAllIngredientsFromMenuService = async (ingredient: {
    item_id: string; // Đổi item_id thành string
}): Promise<any> => {
    try {
        return await MenuItemIngredient.deleteMany({
            item_id: ingredient.item_id,
        });
    } catch (err) {
        throw new Error(`Error deleting all ingredients from menu: ${err}`);
    }
};

export {
    AddIngredientToMenuService,
    RemoveIngredientFromMenuService,
    UpdateIngredientFromMenuService,
    GetIngredientFromMenuService,
    DeleteAllIngredientsFromMenuService,
};
