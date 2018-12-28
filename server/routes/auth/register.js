const db = require("diskdb");

module.exports = (req, res) => {
  const { name, email, password, admin } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email e password são obrigatórios" });
  }

  const data = {
    name,
    email,
    password,
    admin: admin ? true : false
  };

  const user = db.users.save(data);

  return res
    .status(201)
    .json({ id: user._id, name: user.name, admin: user.admin });
};
