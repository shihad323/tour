import { Request, Response } from "express";
import { getChatGPTResponse } from "../../types/openai";

export const ChatController = {
  chat: async (req: Request, res: Response) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Text is required",
        });
      }

      const reply = await getChatGPTResponse(text);

      res.status(200).json({
        success: true,
        data: reply,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
