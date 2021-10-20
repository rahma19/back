module.exports = app => {
    const persons = require("../controllers/controller.js");
  
    var router = require("express").Router();
  
    // Create a new person
    router.post("/", persons.create);
  
    // Retrieve all persons
    router.get("/", persons.findAll);
  
    // Retrieve a single person with id
    router.get("/:id", persons.findOne);
  
    // Update a person with id
    router.put("/:id", persons.update);
  
    // Delete a person with id
    router.delete("/:id", persons.delete);
  
    app.use('/api/persons', router);
  };