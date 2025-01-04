import Razorpay from "razorpay";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import paymentModel from "../models/paymentModel.js";
import applicationModel from "../models/applicationModel.js";
dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY || "rzp_test_1DP5mmOlF5G5ag",
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createCheckoutRazorpay = async (req, res) => {
  var options = {
    amount: parseInt(req.body?.amount) * 100,
    currency: req.body?.curreny || "INR",
    receipt: req.body?.applicationNumber,
  };
  await instance.orders.create(options, function (err, order) {
    if (!err) {
      res.status(200).json(order);
    }
  });
};

export const getRazorPayKey = async (req, res) => {
  const loginStudentId = req.user.userId;

  const userDetails = await User.findOne({ _id: loginStudentId });

  res
    .status(200)
    .json({ key: process.env.RAZORPAY_KEY, userDetails: userDetails });
};

export const captureRazorPayPayment = async (req, res) => {
  const { paylod, paymentId, orderId, signature, applicationId } = req.body;
  const loginStudentId = req.user.userId;

  const obj = {
    paylod: paylod,
    paymentId: paymentId,
    orderId: orderId,
    signature: signature,
    applicationId: applicationId,
    userId: loginStudentId,
  };

  const createPayment = await paymentModel.create(obj);

  if (createPayment) {
    // update user Payment Status

    const updateApplicationStatus = await applicationModel.findOneAndUpdate(
      { _id: applicationId },
      { paymentStatus: true }
    );

    if (updateApplicationStatus) {
      res.status(201).json({ message: "Payment Captured,", createPayment });
    } else {
      res.status(200).json({
        message: "Payment Captured, But Not Updated the Application Status.",
        createPayment,
      });
    }
  } else {
    res.status(500).json({ message: "Something went wrong," });
  }
};
