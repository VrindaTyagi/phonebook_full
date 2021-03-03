require("dotenv").config();
const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);
const newName = process.argv[3];
const newNumber = process.argv[4];

if (process.argv.length > 3) {
  const person = new Person({
    name: newName,
    number: newNumber
    });

  person.save().then((result) => {
    console.log(`Added ${newName} number ${newNumber} to phonebook.`);
    mongoose.connection.close();
  });
} else if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("People:");
    result.forEach((record) => {
      console.log(record.name + " " + record.number);
    }, mongoose.connection.close());
  });
}
