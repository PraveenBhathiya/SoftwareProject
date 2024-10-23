const mongoose = require("mongoose");

const uri =
"mongodb+srv://choolanuwanugc987:JfdXdk453UVK315D@cluster0.fwknj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbConnection = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Could not connect to MongoDB Atlas", err);
  }
};

module.exports = dbConnection;
