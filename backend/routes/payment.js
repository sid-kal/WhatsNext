require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: "rzp_test_oh9lOH7URWO3MH",
            key_secret: "92JBJuM3bKYBb0pmr2NxNtd4",
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/verify", async (req, res) => {
    const { paymentId, orderId, signature } = req.body;
    const razorpay = new Razorpay({
        key_id: 'rzp_test_oh9lOH7URWO3MH',
        key_secret: "92JBJuM3bKYBb0pmr2NxNtd4",
      });
    const hmac = crypto.createHmac('sha256', "92JBJuM3bKYBb0pmr2NxNtd4");
    hmac.update(orderId + '|' + paymentId);
  
    const digest = hmac.digest('hex');
  
    if (digest !== signature) {
      res.status(400).send('Invalid signature');
      return;
    }
  
    try {
      const payment = await razorpay.payments.fetch(paymentId);
      if (payment.order_id !== orderId) {
        res.status(400).send('Invalid payment order');
        return;
      }
  
      if (payment.status !== 'captured') {
        res.status(400).send('Payment not captured');
        return;
      }
  
      // TODO: Update payment status in your database
  
      res.json({ status: 'success' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Payment verification failed');
    }
});
module.exports = router