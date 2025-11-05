const Razorpay = require('razorpay');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount required' });

    const rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await rzp.orders.create({
      amount: Number(amount),
      currency: 'INR',
      receipt: 'rcpt_' + Date.now(),
    });

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
