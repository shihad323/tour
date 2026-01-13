import { Server } from "http";
import expressApp from "./app";
// import { connectDB } from "./app/config/db";
// import { envVars } from "./app/config/env";
import { connectDB } from "./app/config/db";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const port = Number(envVars.PORT) || 5000;
    server = expressApp.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
  }
};

// Graceful shutdown on unexpected errors
process.on("unhandledRejection", (err) => {
  console.error("💥 UNHANDLED REJECTION! Shutting down...");
  if (server) server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
  if (server) server.close(() => process.exit(1));
  process.exit(1);
});

console.log("OpenAI key loaded:", !!process.env.OPENAI_API_KEY);


startServer();

// shihad is a good boy ..
