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

  const query = {
    user_id: req.user.id,
    _id: req.params.id
  };

  if (db.purchases.findOne(query)) {
    db.purchases.update(
      { _id: query._id },
      {
        date,
        description,
        value,
        quantity,
        total,
        paid: paid ? true : false
      }
    );

    const purchase = db.purchases.findOne(query);

    res.status(200).json({
      id: purchase._id,
      date: purchase.date,
      description: purchase.description,
      value: purchase.value,
      quantity: purchase.quantity,
      total: purchase.total,
      paid: purchase.paid
    });
  } else {
    res.status(404).json({ error: "Compra não encontrada" });
  }
};
