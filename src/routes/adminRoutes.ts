import express from "express";
import { promoteToAdmin, demoteToUser } from "../controllers/adminController";
import { protect, authorize } from "../middleware/authMiddleware";

const router = express.Router();

// Promote a user to admin (only admins can do this)
router.put("/promote/:id", protect, authorize(["admin"]), promoteToAdmin);

// Demote an admin to user (only admins can do this)
router.put("/demote/:id", protect, authorize(["admin"]), demoteToUser);

export default router;
