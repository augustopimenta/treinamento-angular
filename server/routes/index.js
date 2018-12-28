const express = require("express");

const v1 = express.Router();

const auth = express.Router();
auth.get("/unique-email", require("./auth/uniqueEmail"));
auth.post("/login", require("./auth/login"));
auth.post("/register", require("./auth/register"));

v1.use("/auth", auth);

const purchases = express.Router();
purchases.use(require("./middlewares/auth"));
purchases.get("/", require("./purchases/all"));
purchases.post("/", require("./purchases/create"));
purchases.post("/:id", require("./purchases/update"));
purchases.delete("/:id", require("./purchases/delete"));

v1.use("/purchases", purchases);

module.exports = v1;
