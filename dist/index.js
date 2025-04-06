"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const loanRoutes_1 = __importDefault(require("./routes/loanRoutes"));
const db_1 = __importDefault(require("./config/db"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/loans", loanRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("API is running...");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
