require("dotenv").config();

const mongoose = require("mongoose");

const connectMongoDb = async () => {
  console.log(process.env.MONGODB_URL);
  try {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a Mongo Db");
  } catch (error) {
    console.error("Error al conectar a mongo: ", error);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDb,
};
