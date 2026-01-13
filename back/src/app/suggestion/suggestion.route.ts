import express from "express";
import { ChatController } from "./suggestion.controller";

const router = express.Router();

router.post("/", ChatController.chat);

export const ChatRoutes = router;
