import { Request, Response } from "express";
import db from "../models";
import axios, { Method } from "axios";

export const createCustomerInfo = async (req: Request, res: Response) => {
  const { name, phoneNumber, shippingAddress, refferalCode, email } = req.body;
  try {
    const customerInfo = await db.CustomerInfo.create({
      name: name.toLowerCase(),
      phoneNumber,
      shippingAddress,
      refferalCode,
      email,
    });
    res.status(200).json({ msg: "success", customerInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", error });
  }
};

export const chargeCustomers = async (req: Request, res: Response) => {
  const customers = await db.Customer.findAll({});

  customers.forEach(async (customer) => {
    customer.authorization = JSON.parse(customer.authorization);

    const authCode = customer.authorization.authorization_code;
    const email = customer.email;
    console.log(email, authCode);

    try {
      const params = JSON.stringify({
        email,
        authorization_code: authCode,
        amount: 990000,
      });

      const config = {
        // port: 443,
        url: "https://api.paystack.co/transaction/charge_authorization",
        method: "POST" as Method,
        data: params,
        headers: {
          Authorization: `Bearer ${process.env.SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios(config);
      console.log(response.data);
      const final = response.data;
      // return res?.data;
      res.status(200).json({ msg: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "error", error });
    }
  });
};

export const getRegisteredCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await db.Customer.findAll({});
    const numOfCustomers = customers.length;
    res.status(200).json({ msg: "success", numOfCustomers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error", error });
  }
};
