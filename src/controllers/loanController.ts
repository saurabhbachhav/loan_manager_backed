import { Request, Response } from "express";
import Loan from "../models/Loan";

// @desc    Apply for a new loan
// @route   POST /api/loans
// @access  Private (User)
export const applyForLoan = async (req: Request, res: Response) => {
  const { amount, interestRate, tenure } = req.body;

  try {
    const loan = new Loan({
      user: req.user!._id,
      amount,
      interestRate,
      tenure,
    });

    const createdLoan = await loan.save();
    res.status(201).json(createdLoan);
  } catch (error) {
    res.status(400).json({ message: "Invalid loan data" });
  }
};

// @desc    Get all loans
// @route   GET /api/loans
// @access  Private (Admin or Verifier)
export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await Loan.find().populate("user", "name email");
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get loan by ID
// @route   GET /api/loans/:id
// @access  Private (Admin, Verifier, or Owner)
export const getLoanById = async (req: Request, res: Response) => {
  try {
    const loan = await Loan.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // Allow access if admin, verifier, or the loan belongs to the user
    if (
      req.user!.role === "admin" ||
      req.user!.role === "verifier" ||
      loan.user._id.equals(req.user!._id)
    ) {
      res.json(loan);
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update loan status
// @route   PUT /api/loans/:id/status
// @access  Private (Admin or Verifier)
export const updateLoanStatus = async (req: Request, res: Response) => {
  const { status } = req.body;

  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // Only allow admins and verifiers to update status
    if (req.user!.role === "admin" || req.user!.role === "verifier") {
      loan.status = status;
      console.log("coming...");

      try {
        const updatedLoan = await loan.save();
        return res.json(updatedLoan); // ✅ only respond once here
      } catch (error) {
        console.error(
          `Error updating loan status for ID ${req.params.id}:`,
          error
        );
        return res.status(500).json({
          message: "Internal Server Error",
          error: error,
        });
      }
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

