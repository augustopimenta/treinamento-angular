const db = require("diskdb");
const crypto = require("crypto");

module.exports = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
  }

  const user = db.users.findOne({ email, password });

  if (!user) {
    return res.status(401).json({ error: "E-mail e/ou senha incorretos" });
  }

  const token = crypto
    .createHash("sha256")
    .update(JSON.stringify(user) + new Date().getTime())
    .digest("hex");

  db.users.update({ _id: user._id }, { auth_token: token });

  setTimeout(() => {
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
      },
      auth_token: token
    });
  }, 3000);
};
