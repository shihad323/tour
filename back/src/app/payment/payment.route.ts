import { Router } from "express";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/init", PaymentController.init);
router.post("/success", PaymentController.success);
router.post("/fail", PaymentController.fail);
router.post("/cancel", PaymentController.cancel);

export const PaymentRoutes = router;
