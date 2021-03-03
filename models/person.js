const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
/* const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  }); */

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: [3, "Min length of name should be 3"],
    required: [true, "User name required"],
  },

  number: {
    type: Number,
    required: [true, "User phone number required"],
    minlength: [8, "Min length of a number should be 8"],
  },
});
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
