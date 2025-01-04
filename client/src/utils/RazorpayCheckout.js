import { toast } from "react-toastify";
import {
  capturePaymentOfRazorPay,
  createCheckoutOfRazorPay,
  getRazorPayACCKey,
} from "./Api";

const paymentOptions = {
  amount: 199,
  currency: "INR",
  name: "DMTIMS",
  description: "Application Submission...",
  image:
    "https://www.dmtims.edu.in/_next/image?url=%2FnewImages%2FdmtimsLogo.webp&w=1920&q=75",
  notes: {
    address: "DMTIMS Navi Mumbai Office",
  },
  theme: { color: "#EA3565" },
};

const handleCallback = async (data, checkOutRes, id) => {
  const paylod = checkOutRes;
  const paymentId = data?.razorpay_payment_id;
  const orderId = data?.razorpay_order_id;
  const signature = data?.razorpay_signature;
  const applicationId = id;

  const payloadObj = {
    paylod,
    paymentId,
    orderId,
    signature,
    applicationId,
  };

  try {
    const response = await capturePaymentOfRazorPay(payloadObj);
    toast.success("Payment Completed... ")
    console.log(response);
  } catch (error) {
    console.log(error);
    toast.warn("Something went wrong..., Please try again.")
  }
};

export const payFees = async (id) => {
  try {
    const checkoutObj = {
      amount: paymentOptions.amount,
      curreny: paymentOptions.currency,
      applicationNumber: id,
    };

    // create a checkout and get order id
    const checkoutRes = await createCheckoutOfRazorPay(checkoutObj);

    if (checkoutRes?.id) {
      // get the razorpay key and user details
      const response = await getRazorPayACCKey();

      if (response?.key) {
        // create a option object
        const options = {
          key: response?.key,
          amount: paymentOptions.amount,
          currency: paymentOptions.currency,
          name: paymentOptions.name,
          description: paymentOptions.description,
          image: paymentOptions.image,
          order_id: checkoutRes?.id,
          handler: (response) => handleCallback(response, checkoutRes, id),
          prefill: {
            name: response?.userDetails?.name,
            email: response?.userDetails?.email,
            contact: response?.userDetails?.mobile,
          },
          notes: {
            address: paymentOptions.notes.address,
          },
          theme: {
            color: paymentOptions.theme.color,
          },
        };

        // initilize the razorpay payment
        const razorPay = new window.Razorpay(options);
        // call the open method
        razorPay.open();

        // handle the errors
        razorPay.on("payment.failed", function (response) {
          console.log(response.error);
          toast.warn("Payment Failed..., Please try again.");
        });
      }
    }
  } catch (error) {
    console.log(error);
    toast.warn("Payment Failed..., Please try again.");
  }
};
