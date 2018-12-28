const db = require("diskdb");

module.exports = (req, res) => {
  const query = {
    user_id: req.user.id,
    _id: req.params.id
  };

  if (db.purchases.findOne(query)) {
    db.purchases.remove({ _id: query._id }, false);
    res.status(200).json();
  } else {
    res.status(404).json({ error: "Compra não encontrada" });
  }
};
