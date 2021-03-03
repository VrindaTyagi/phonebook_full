const personsRouter = require("express").Router();
const Person = require("../models/person");
// const app = require("../app");
//seems good

personsRouter.get("/", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

personsRouter.post("/", (request, response, next) => {
  const body = request.body;

  if (body.number.length < 8) {
    return response.status(400).json({
      error: "Min length of a number should be 8",
    });
  }

  if (body.name === undefined) {
    return response.status(400).json({ error: "name missing" });
  }

  const person = new Person({
    name: body.name,
    number: Number(body.number),
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormatted) => {
      response.json(savedAndFormatted);
    })
    .catch((error) => next(error));
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});


personsRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: Number(body.number),
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
