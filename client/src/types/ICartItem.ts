export interface ICartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    total?: number;
    image: string;
}