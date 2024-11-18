import { MenuItem } from "./menu.model"; // Đảm bảo đường dẫn chính xác
import { ObjectId } from "mongodb";

// Thêm món ăn vào menu
const AddMenuService = async (menu: {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}) => {
    try {
        const newMenuItem = new MenuItem({
            ...menu,
            item_id: new ObjectId(),
        });
        const result = await newMenuItem.save();
        return result;
    } catch (err) {
        throw new Error(`Error adding menu item: ${err}`);
    }
};

// Cập nhật món ăn trong menu
const UpdateMenuService = async (menu: {
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    category?: string;
    item_id: string;
    availability?: boolean;
}) => {
    const { item_id, ...updateData } = menu;
    try {
        const result = await MenuItem.findOneAndUpdate(
            { item_id },
            updateData,
            {
                new: true,
            }
        );
        return result;
    } catch (err) {
        throw new Error(`Error updating menu item: ${err}`);
    }
};

// Xóa món ăn trong menu
const DeleteMenuService = async (item_id: string) => {
    try {
        const result = await MenuItem.findOneAndDelete({ item_id });
        return result;
    } catch (err) {
        throw new Error(`Error deleting menu item: ${err}`);
    }
};

// Lấy menu theo tham số
const GetMenuByParamsService = async (params: {
    page: number;
    limit: number;
    title?: string;
    category?: string;
    availability?: string;
}) => {
    const { page, limit, title, category, availability } = params;
    const query: any = {};

    if (title) {
        query.title = { $regex: title, $options: "i" };
    }
    if (category) {
        query.category = category;
    }
    if (availability !== undefined) {
        query.availability = availability === "1";
    }

    const numberPage = (page - 1) * limit;

    try {
        const result = await MenuItem.find(query).skip(numberPage).limit(limit);
        const total = await MenuItem.countDocuments(query);
        return {
            message: "Menu items fetched successfully",
            data: result,
            total,
        };
    } catch (err) {
        throw new Error(`Error getting menu items: ${err}`);
    }
};

const GetAllMenuService = async () => {
    try {
        const result = await MenuItem.find(); // Lấy tất cả món ăn
        return {
            message: "All menu items fetched successfully",
            data: result,
        };
    } catch (error) {
        throw new Error(`Error getting all menu items: ${error}`);
    }
};

// Lấy món ăn theo ID
const GetMenuByIdService = async (item_id: string) => {
    try {
        const result = await MenuItem.findOne({ item_id });
        return result;
    } catch (err) {
        throw new Error(`Error getting menu item by ID: ${err}`);
    }
};

// Lấy món ăn đặc biệt
const GetSpecialMenuService = async () => {
    try {
        const result = await MenuItem.find({ category: "Special" });
        return result;
    } catch (err) {
        throw new Error(`Error getting special menu items: ${err}`);
    }
};

export {
    AddMenuService,
    UpdateMenuService,
    GetAllMenuService,
    DeleteMenuService,
    GetMenuByParamsService,
    GetMenuByIdService,
    GetSpecialMenuService,
};
