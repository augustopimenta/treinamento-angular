const db = require("diskdb");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const [type, token] = auth.split(" ");

    const user = db.users.findOne({ auth_token: token });

    if (user) {
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
      };
      return next();
    }
  }

  res.status(401).json({ error: "Acesso negado" });
};
