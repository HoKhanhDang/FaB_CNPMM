import express from "express";
import ShipperStatusManager from "./sockets/socketManager";
const app = express();
const port = 5000;
// const initRoutes = require("./route");
import initRoutes from "./route-main";
import connectDB from "./config/mongodb.config";
import cors from "cors";

app.use(express.json());
require("dotenv").config();

const allowedOrigins = process.env.ORIGIN ? process.env.ORIGIN.split(",") : [];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (
            !origin ||
            allowedOrigins.includes("*") ||
            allowedOrigins.includes(origin)
        ) {
            callback(null, true);
        } else {
            callback(new Error("Không được phép truy cập từ nguồn này."));
        }
    },
};
app.use(cors(corsOptions));

initRoutes(app);
const manager = new ShipperStatusManager();
manager.start(5001);
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
