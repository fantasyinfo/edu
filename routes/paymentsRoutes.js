import express from "express";
import { captureRazorPayPayment, createCheckoutRazorpay, getRazorPayKey } from "../controllers/PaymentController.js";

const paymentRouter = express.Router();

paymentRouter.post('/get-key', getRazorPayKey)
paymentRouter.post('/create-checkout', createCheckoutRazorpay)
paymentRouter.post('/capture-payment', captureRazorPayPayment)

export default paymentRouter;