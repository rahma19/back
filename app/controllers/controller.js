const db = require("../models");
const person = db.persons;

// Create and Save a new person
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a person
    const person = new person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      published: req.body.published ? req.body.published : false
    });
  
    // Save person in the database
    person
      .save(person)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the person."
        });
      });
  };

// Retrieve all persons from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
  
    person.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving persons."
        });
      });
  };

// Find a single person with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    person.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found person with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving person with id=" + id });
      });
  };

// Update a person by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update person with id=${id}. Maybe person was not found!`
          });
        } else res.send({ message: "person was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating person with id=" + id
        });
      });
  };

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    person.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete person with id=${id}. Maybe person was not found!`
          });
        } else {
          res.send({
            message: "person was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete person with id=" + id
        });
      });
  };
