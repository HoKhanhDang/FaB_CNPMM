import { Router } from "express";
const router = Router();
import GptController  from "./gptController";

router.post("/", GptController.GenerateCodeAPI); 

export default router;