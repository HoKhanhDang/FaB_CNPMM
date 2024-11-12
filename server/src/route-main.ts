import userRouter from "./components/User/userRoutes";
import authRouter from "./components/Auth/authRoutes";
import menuRouter from "./components/Menu/menuRoutes";
import ingredientRouter from "./components/Ingredient/ingredientRoutes";
import nutriRouter from "./components/Nutrition/nutriRoutes";
import orderRouter from "./components/Order/orderRoutes";
import notificationRouter from "./components/Notification/notificationRoutes";
import shiftRouter from "./components/Shift/shiftRoutes";
import dashboardRouter from "./components/Dashboard/dashboardRoutes";
import vnpayRouter from "./components/Payment/vnpayRoutes";
import menu_item_ingredients_Router from "./components/MenuItemIngredient/menuitemIngredientRoutes";
import gptRouter from "./components/OpenAI/gptRoutes";
import layoutRouter from "./components/Grid/gridRoutes";
import ratingRouter from "./components/Rating/ratingRoutes";

const initRoutes = (app: any) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);

  app.use("/api/menu-item", menuRouter);
  app.use("/api/menu-ingredient", menu_item_ingredients_Router);
  app.use("/api/ingredient", ingredientRouter);
  app.use("/api/nutrition", nutriRouter);

  app.use("/api/order", orderRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/shift", shiftRouter);
  
  app.use("/api/chart", dashboardRouter);
  app.use("/api/vnpay", vnpayRouter);
  app.use("/api/gpt", gptRouter);
  app.use("/api/grid", layoutRouter);
  app.use("/api/rating", ratingRouter);
};

export default initRoutes;
