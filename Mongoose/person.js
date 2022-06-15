const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/shopAppDB");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopAppDB");
  console.log("mongoose connected");
}

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});

// Virtuals in Mongoose - creating virtual properties.

personSchema.virtual("fullName").get(function () {
  return `${this.first} ${this.last}`;
});
// to call it you take instance tammy.fullName
// this was just the getter, if we have info we can combine and display the info.

// const Person = mongoose.model("Person", personSchema);

// const tammy = new Person({ first: "Tammy", last: "Chow" });
// tammy.save();
// console.log(tammy.fullName);
//notice it's not a method, so no () after fullName.

// mongoose lets us run code before something is removed or updated. We can run pre or post hook/middleware.
// i.e. if you delete user, you might have to delete all their posts, comments created by that user.

// for this to work we need to define next at the end of the function or we need to return Promise. This is to ensure something is happening before this and will be happening after.

personSchema.pre("save", async function () {
  console.log("ABOUT TO SAVE");
});

personSchema.post("save", async function () {
  console.log("POST SAVED NOWWW");
});

// const yulia = new Person({ first: "Yulia", last: "Kirienko" });
// yulia.save();

// const colt = new Person({ first: "Colt", last: "Steele" });

// colt.save((p) => console.log(p));

// const ana = new Person({ first: "Ana", last: "Steele" });
// ana.save();

// ********* you have to define middleware like .pre .post before creating an instance of the Schema. Otherwise it will not recognize it.

const Person = mongoose.model("Person", personSchema);
const ana = new Person({ first: "Ana", last: "Steele" });
ana.save();
