import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export const PaymentController = {

  init: async (req: Request, res: Response) => {
    try {
      const { amount, userId, tourId } = req.body;

      const result = await PaymentService.initPayment(amount, userId, tourId);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  success: async (req: Request, res: Response) => {
    await PaymentService.success(req.body);
    return res.redirect(`${process.env.FRONTEND_URL}/success`);
  },

  fail: async (req: Request, res: Response) => {
    await PaymentService.fail(req.body);
    return res.redirect(`${process.env.FRONTEND_URL}/fail`);
  },

  cancel: async (req: Request, res: Response) => {
    await PaymentService.cancel(req.body);
    return res.redirect(`${process.env.FRONTEND_URL}/cancel`);
  },
};
