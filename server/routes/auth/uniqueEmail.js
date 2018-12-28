const db = require("diskdb");

module.exports = (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "email é obrigatório" });
  }

  const user = db.users.findOne({ email });

  setTimeout(() => {
    res.status(200).json(user ? false : true);
  }, 3000);
};
