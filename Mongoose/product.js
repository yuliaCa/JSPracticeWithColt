const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/shopAppDB");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopAppDB");
  console.log("mongoose connected");
}

// the below is longer way to add type to the property, but it lets us add validation and other things.
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    // we can type custom error messages
    min: [0, "price must be more than 0"],
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: [String],
    default: "category",
  },
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
  size: {
    type: String,
    //   only below values are accepted
    enum: ["S", "M", "L"],
  },
});

// Defining our own instance methods. DO NOT use arrow functions, because we will be using this. To define our own instance method we will use .methods.ourMethodName
productSchema.methods.greet = function () {
  console.log(`HELLOOO, YOU ARE VIEWING ${this.name}`);
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  this.save;
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  this.save();
};

// defining static methods, the ones that will be working on the entire schema, not just each separate instance. We will use .statics.ourMethodName
productSchema.statics.fireSale = function () {
  // we are updating all products within Product with onSale being true and price of 10.
  return this.updateMany({}, { onSale: true, price: 10 });
};

const Product = mongoose.model("Product", productSchema);

Product.fireSale().then((res) => console.log(res));

const findProduct = async function () {
  const foundProduct = await Product.findOne({ name: "Cycling Jersey" });
  console.log(foundProduct);
  await foundProduct.toggleOnSale();
  console.log(foundProduct);
  await foundProduct.addCategory("outdoors");
};
// findProduct();

const bike = new Product({
  name: "Cycling Jersey",
  price: 37.99,
  categories: ["cycling", "clothes"],
  size: "S",
});

// if you add additional properties to the object to paste into DB - it won't return error - but it won't add it to DB if it's not part of the Schema.

// bike
//   .save()
//   .then((data) => {
//     console.log("It works");
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//   validation only works when records are being created. if we want for validation to work - we should specifically tell it to mongoose.

// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -88815.79 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("It works");
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
