import { Order, IOrder, IOrderItem, OrderItem } from "./order.model";
import { convertDay } from "../../utils/Order";
import { MenuItem } from "../Menu/menu.model";
import { ObjectId } from "mongodb";
import { now } from "mongoose";
import { MenuItemIngredient } from "../MenuItemIngredient/menuitemIngredient.model";
import { Ingredient } from "../Ingredient/ingredient.model";

type OrderItems = {
    item_id: string;
    quantity: number;
};

const checkAndReduceStock = async (
    menuitemId: string,
    quantityOrdered: number
) => {
    // Lấy danh sách nguyên liệu cần thiết cho món
    const ingredientsNeeded = await MenuItemIngredient.find({
        item_id: menuitemId,
    });

    // Duyệt từng nguyên liệu cần cho món
    for (const item of ingredientsNeeded) {
        const ingredient = await Ingredient.findOne({
            ingredient_id: item.ingredient_id,
        });
        const totalRequired = (item.quantity_required ?? 0) * quantityOrdered;
        // Kiểm tra tồn kho
        if (
            !ingredient ||
            (ingredient.stock ?? 0) < totalRequired ||
            !ingredient.is_available
        ) {
            if (ingredient) {
                ingredient.is_available = false;
                ingredient.save();
            }
            return false; // Hết hàng
        }
    }

    // Trừ tồn kho sau khi kiểm tra đủ
    for (const item of ingredientsNeeded) {
        const totalRequired = (item.quantity_required ?? 0) * quantityOrdered;
        await Ingredient.updateOne(
            { ingredient_id: item.ingredient_id },
            { $inc: { stock: -totalRequired } }
        );
    }
    return true;
};

const CreateOrderService = async (params: {
    user_id: string; // ID người dùng
    total_price: number | null; // Tổng giá đơn hàng
    message?: string; // Tin nhắn kèm theo
    payment_method: string | null; // Phương thức thanh toán
    address: string | null; // Địa chỉ giao hàng
    lng?: number | null; // Kinh độ
    lat?: number | null; // Vĩ độ
    list_items?: OrderItems[];
}): Promise<{
    message: string;
    status: boolean;
    code: number;
    data?: IOrder | null;
}> => {
    if (params.list_items) {
        for (const item of params.list_items) {
            if (!(await checkAndReduceStock(item.item_id, item.quantity))) {
                //logic to change status of item to unavailable
                const menuItem = await MenuItem.findOne({
                    item_id: item.item_id,
                });
                if (menuItem) {
                    menuItem.availability = false;
                    menuItem.save();
                }

                return {
                    code: 409,
                    message: "Out of stock",
                    status: false,
                };
            }
        }
    }
    const data = new Order({
        order_id: new ObjectId(),
        user_id: params.user_id,
        total_price: params.total_price,
        message: params.message || null,
        address: params.address,
        payment_method: params.payment_method,
        create_at: new Date(), // Thời gian tạo đơn hàng
        status: "Pending", // Trạng thái ban đầu
        lng: params.lng || null,
        lat: params.lat || null,
        delivery_time: null,
        shipper_id: null,
    });

    const order = new Order(data);
    const dataSave = await order.save();
    return {
        message: "Create order successfully",
        status: true,
        code: 200,
        data: dataSave,
    };
};

const AddOrderItemService = async (params: {
    order_id: string;
    item_id: string;
    quantity: number;
}): Promise<IOrderItem> => {
    const { order_id, item_id, quantity } = params;
    const orderItem = new OrderItem({
        order_id,
        item_id,
        quantity,
    });
    const newOrderItem = new OrderItem(orderItem);
    return await newOrderItem.save();
};

const GetOrderByParamsService = async (params: {
    search?: string; // Tìm kiếm
    status?: string; // Trạng thái
    create_at?: string; // Ngày tạo
    limit: number; // Giới hạn số lượng trả về
    page: number; // Trang
    history?: string; // Lịch sử
}) => {
    const { search, status, create_at, limit, page, history } = params;
    const query: any = {};
    if (search) {
        query.$or = [
            { user_id: { $regex: new RegExp(`${search}`, "i") } },
            { order_id: { $regex: new RegExp(`${search}`, "i") } },
        ];
    }
    if (status) {
        query["status"] = status;
    }

    if (history !== "1") {
        query.status = { $nin: ["Cancelled", "Successfully"] };
        if (status) {
            query.status = {
                $regex: status,
                $options: "i",
                $nin: ["Cancelled"],
            };
        }
    } else {
        query.status = { $in: ["Successfully", "Cancelled"] };
    }
    if (create_at) {
        query.create_at = { $gte: new Date(create_at) };
    }

    const rs = await Order.find(query)
        .limit(limit)
        .skip(limit * (page - 1));
    const total = await Order.countDocuments(query);
    return {
        message: "Get orders by params successfully",
        data: rs,
        total: total,
    };
};

const GetOrderByCustomerIdService = async (params: {
    user_id: string; // ID người dùng
}): Promise<IOrder[]> => {
    const { user_id } = params;
    const order = await Order.find({ user_id });
    return order;
};

const GetOrderDetailByIdService = async (
    order_id: string
): Promise<IOrderItem[] | null> => {
    const item = await OrderItem.find({ order_id: order_id });
    const itemsCourse = await MenuItem.find({ item_id: item[0].item_id });
    item[0].title = itemsCourse[0].title;
    item[0].price = itemsCourse[0].price;
    item[0].image = itemsCourse[0].image;

    item[0].save;
    return item;
};

const GetOrderByIdService = async (
    order_id: string
): Promise<IOrder[] | null> => {
    return await Order.findOne({ order_id: order_id });
};

const GetOrderItemsService = async (): Promise<IOrderItem[]> => {
    return await OrderItem.find();
};

const ChangeStatusService = async (params: {
    order_id: string; // ID đơn hàng
    status:
        | "Pending"
        | "Processing"
        | "Packed"
        | "Delivering"
        | "Delivered"
        | "Successfully"
        | "Cancelled"; // Trạng thái mới
    delivery_time?: string | null; // Thời gian giao hàng
    user_id?: string | null; // ID người giao hàng
}): Promise<IOrder | null> => {
    const { order_id, status, delivery_time, user_id } = params;
    const updateData: any = { status };
    if (delivery_time !== undefined) {
        updateData.delivery_time = convertDay(delivery_time as string);
    } else {
        updateData.delivery_time = now();
    }

    if (user_id !== undefined) {
        updateData.shipper_id = user_id; // Giả sử user_id là số
    }

    return await Order.findOneAndUpdate({ order_id: order_id }, updateData, {
        new: true,
    });
};

const CancelOrderService = async (params: {
    order_id: string; // ID đơn hàng
    message: string; // Tin nhắn kèm theo
}): Promise<IOrder | null> => {
    const { order_id, message } = params;
    return await Order.findOneAndUpdate(
        { order_id: order_id },
        { status: "Cancelled", message },
        { new: true }
    );
};

const GetShipperOrderService = async (params: {
    shipper_id: string; // ID người giao hàng
}): Promise<IOrder[]> => {
    const { shipper_id } = params;
    return await Order.find({ status: "Delivering", shipper_id });
};

export {
    CreateOrderService,
    AddOrderItemService,
    GetOrderByParamsService,
    GetOrderByCustomerIdService,
    GetOrderDetailByIdService,
    GetOrderItemsService,
    ChangeStatusService,
    GetOrderByIdService,
    CancelOrderService,
    GetShipperOrderService,
};
