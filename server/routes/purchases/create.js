const db = require("diskdb");

module.exports = (req, res) => {
  const date = req.body.date;
  const description = req.body.description;
  const value = req.body.value;
  const quantity = req.body.quantity;
  const total = req.body.total;
  const paid = req.body.paid;

  if (!date || !description || !value || !quantity || !total) {
    return res.status(400).json({
      error: "date, description, value, quantity e total são obrigatórios"
    });
  }

  const purchase = db.purchases.save({
    user_id: req.user.id,
    date,
    description,
    value,
    quantity,
    total,
    paid: paid ? true : false
  });

  res.status(201).json({
    id: purchase._id,
    date: purchase.date,
    description: purchase.description,
    value: purchase.value,
    quantity: purchase.quantity,
    total: purchase.total,
    paid: purchase.paid
  });
};
