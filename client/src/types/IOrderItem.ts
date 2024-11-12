import { ICartItem } from "./ICartItem";

export interface IOrderItem {
    order_id: string;
    delivery_time: string;
    status: string;
    total: number;
    orderItems: ICartItem[];
    shipper_id?: string;
    create_at: string;
    total_price: number;
}
