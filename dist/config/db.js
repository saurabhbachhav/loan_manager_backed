"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    //     console.log("process.env.MONGO_URI");
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
        //     console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("Database connected successfully...");
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
exports.default = connectDB;
