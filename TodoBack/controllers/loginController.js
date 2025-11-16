const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/loginModel");

const newUserController = async (req, res) => {
  const { user, mail, password } = req.body;

  if (!user || !mail || !password) {
    return res.status(400).json({
      status: "error",
      message: "Usuario, correo y contraseña son requeridos",
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ user }, { mail }] });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "El usuario o correo ya existen",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ user, mail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      status: "OK",
      message: "Usuario registrado con éxito",
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      status: "error",
      message: "Error al registrar el usuario",
    });
  }
};

const loginUserController = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({
      error: "Correo y contraseña son requeridos",
    });
  }

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, user: user.user },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "OK",
      token,
      message: "Login exitoso",
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = {
  newUserController,
  loginUserController,
};
