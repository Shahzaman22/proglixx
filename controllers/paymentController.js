const {Payment} = require('../modal/payment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;


exports.createPayment = async (req, res) => {
    try {
      const { userId, productId, amount } = req.body;
  
      // Create a new payment in the database
      const payment = await new Payment({
        userId,
        productId,
        amount,
      });
      await payment.save();
  
      // Create a new Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: { paymentId: payment._id.toString() },
      });
  
      // Send the client secret and publishable key to the client
      res.json({
        clientSecret: paymentIntent.client_secret,
        publishableKey: stripePublishableKey,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  


