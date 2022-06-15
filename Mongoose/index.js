const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/movieDB");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/movieDB");
  console.log("mongoose connected");
}

// defining Schema

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  description: String,
});

// name is important, should be singular and with upper case first letter - mongoose will take it and put in plural as collection name.
// Now we have model class called Movie (variable name usually the same)
const Movie = mongoose.model("Movie", movieSchema);

// const amadeus = new Movie({
//   title: "Amadeus",
//   year: 1997,
//   score: 9.3,
//   description: "Nice Movie, Colt likes it",
// });

// Movie.insertMany([
//   {
//     title: "Amelie",
//     year: 2008,
//     score: 8.5,
//     description: "Nice movie about Amelie",
//   },
//   {
//     title: "Dog World",
//     year: 2018,
//     score: 7.5,
//     description: "Story about how dogs see their world",
//   },
//   {
//     title: "Adam's Project",
//     year: 2022,
//     score: 7.3,
//     description: "Story about time travel",
//   },
//   {
//     title: "Age of Adeline",
//     year: 2009,
//     score: 8.9,
//     description: "Interesting story about a woman, who stopped aging",
//   },
// ]).then((data) => {
//   console.log("IT worked");
//   console.log(data);
// });

// now that data is in DB, we practice finding it. node -> .load index.js
// Movies.find({}).then(data=>console.log(data)) - finds all movies in DB
// Movie.find({score:{$gte: 8}}).then(data=>console.log(data)) - finds movies with score more than 8
// Movie.findOne({score:{$gte: 8}}).then(data=>console.log(data)) - find the first movie matching criteria
// Movie.findById('62a5613edc06834dda60c1f6').then(data=>console.log(data)) - finds the movie with matching _id

// UPDATING MOVIES IN MONGOOSE...................

//Movie.updateOne({title:'Amadeus'}, {year:1984}).then(res => console.log(res)) - finds first movie matching criteria (title), sets year field to 1984

// Movie.updateMany({title:{$in:['Amadeus', 'Age of Adeline']}}, {score: 9.9}).then(data=>console.log(data)) - update multiple entires with score to be 9.9 for both

// Movie.findOneAndUpdate({title:"Age of Adeline"}, {title: "Age of Adelaine"}, {new:true}) - if we want to see updated object after the function - we add new:true

// Movie.deleteMany({year:{$lte:2017}}).then(data=>console.log(data)) - deleting several records where year is less than 2017

// Movie.findOneAndDelete({_id:"62a5613edc06834dda60c1f4"}).then(data=>console.log(data)) - delete the one record with matching ID
