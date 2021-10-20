module.exports = mongoose => {
    const person = mongoose.model(
      "person",
      mongoose.Schema(
        {
          id: String,
          firstName: String,
          lastName: String,
          email:String
        },
        { timestamps: true }
      )
    );
  
    return person;
  };