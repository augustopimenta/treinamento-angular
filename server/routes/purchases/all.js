const db = require("diskdb");

module.exports = (req, res) => {
  const search = req.query.search;

  let purchases = db.purchases
    .find({ user_id: req.user.id })
    .map(purchase => ({
      id: purchase._id,
      date: purchase.date,
      description: purchase.description,
      value: purchase.value,
      quantity: purchase.quantity,
      total: purchase.total,
      paid: purchase.paid
    }));

  if (search) {
    const description = req.query.description || '';

    purchases = purchases
      .filter(purchase => purchase.description.toLowerCase().indexOf(description.toLowerCase()) > -1)
      .map(purchase => purchase.description)
      .filter((desc, index, all) => all.indexOf(desc) === index)
      .sort();

    res.status(200).json(purchases);  
    return; 
  } 

  setTimeout(() => {
    res.status(200).json(purchases);
  }, 3000);
};
