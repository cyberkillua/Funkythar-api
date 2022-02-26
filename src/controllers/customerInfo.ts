import { Request, Response } from "express";
import db from "../models";

export const createCustomerInfo = async (req: Request, res: Response) => {
  const { name, phoneNumber, shippingAddress, refferalCode } = req.body;
  try {
    const customerInfo = await db.CustomerInfo.create({
      name: name.toLowerCase(),
      phoneNumber,
      shippingAddress,
      refferalCode,
    });
    res.status(200).json({ msg: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};
