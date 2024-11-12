import { Router } from "express";
const router = Router();
import OrderController from "./orderController";

//order
router.post("/", OrderController.CreateOrderAPI); 
router.get("/", OrderController.GetOrderByParamsAPI);
router.get("/:order_id", OrderController.GetOrderByIdAPI);
router.get("/user/:user_id", OrderController.GetOrderByCustomerIdAPI); 
router.get("/shipper/:user_id", OrderController.GetShipperOrderAPI); 

router.put("/status/:order_id", OrderController.ChangeStatusAPI); 
router.put("/cancel/:order_id", OrderController.CancelOrderAPI);

//order item
router.post("/items", OrderController.AddOrderItemsAPI); 
router.get("/items/:order_id", OrderController.GetOrderDetailByIdAPI); 

export default router;
