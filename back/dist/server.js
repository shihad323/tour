"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import { connectDB } from "./app/config/db";
// import { envVars } from "./app/config/env";
const db_1 = require("./app/config/db");
const env_1 = require("./app/config/env");
let server;
const startServer = async () => {
    try {
        await (0, db_1.connectDB)();
        const port = Number(env_1.envVars.PORT) || 5000;
        server = app_1.default.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.error("❌ Server failed to start:", err);
    }
};
// Graceful shutdown on unexpected errors
process.on("unhandledRejection", (err) => {
    console.error("💥 UNHANDLED REJECTION! Shutting down...");
    if (server)
        server.close(() => process.exit(1));
});
process.on("uncaughtException", (err) => {
    console.error("💥 UNCAUGHT EXCEPTION! Shutting down...");
    if (server)
        server.close(() => process.exit(1));
    process.exit(1);
});
startServer();
// shihad is a good boy ..
