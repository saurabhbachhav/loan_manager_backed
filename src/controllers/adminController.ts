import { Request, Response } from "express";
import User from "../models/User";

// Promote a user to admin
export const promoteToAdmin = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = "admin";
  await user.save();
  res.json({ message: "User promoted to admin successfully." });
};

// Demote an admin to a regular user
export const demoteToUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.role !== "admin") {
    return res.status(400).json({ message: "User is not an admin" });
  }

  user.role = "user";
  await user.save();
  res.json({ message: "Admin demoted to user successfully." });
};
