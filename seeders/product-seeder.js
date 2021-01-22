let Product = require("../models/products");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopping", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

let products = [
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
    title: "Goth",
    description: "Classic German roleplay game",
    price: 10,
  }),
  new Product({
    imagePath: "https://upload.wikimedia.org/wikipedia/en/1/17/BoFIVBox.png",
    title: "Breath of Fire ",
    description: "Classic Japanese roleplay game",
    price: 15,
  }),
  new Product({
    imagePath:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/Dark_Cloud_PS2_Game_cover.jpg",
    title: "Dark ",
    description: "Classic Japanese Action roleplay game",
    price: 20,
  }),
];

async function saveProducts() {
  for (i = 0; i < products.length; i++) {
    await products[i].save();
  }
}

saveProducts().then(() => mongoose.disconnect());
