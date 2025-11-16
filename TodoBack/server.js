require("dotenv").config();
const cors = require("cors");
const express = require("express");

const todoRoutes = require("./routes/todoRoutes");
const todoLogin = require("./routes/todoLogin");

const { connectMongoDb } = require("./config/db/connectDb");

const app = express();

const PORT = process.env.PORT;

connectMongoDb();

app.use(cors());

app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/login", todoLogin);
app.listen(PORT, (request, response) => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
