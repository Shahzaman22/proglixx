const {Payment} = require('../model/payment')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

exports.createPayment = async (req, res) => {
  try {
    const { userId, productId, amount } = req.body;

    const payment = await new Payment({
      userId,
      productId,
      amount,
    });
    await payment.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { paymentId: payment._id.toString() },
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret,
      publishableKey: stripePublishableKey,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.confirmPayment =  async (req, res) => {
  try {
    const { clientSecret } = req.body;
    let paymentIntentId = 'pi_3MmDLfJX4vjDHJpe1FWEJqtl';
    paymentIntentId = await stripe.paymentIntents.retrieve(paymentIntentId);

if (paymentIntentId.status === 'succeeded') {
  console.log("PaymentIntent has already been confirmed");
} else {
  const paymentIntentResult = await stripe.paymentIntents.confirm(clientSecret);
}

    res.json({ paymentIntent : paymentIntent , message: 'Payment confirmed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};





