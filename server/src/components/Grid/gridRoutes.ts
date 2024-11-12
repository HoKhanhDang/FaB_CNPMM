import { Router } from "express";
const router = Router();
import layoutController from "./gridController";

router.get("/", layoutController.GetLayout);
router.post("/", layoutController.AddLayout);
router.put("/:layout_id", layoutController.UpdateLayout);
router.delete("/:layout_id", layoutController.DeleteLayout);

export default router;
