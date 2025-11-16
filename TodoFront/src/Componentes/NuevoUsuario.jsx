import React, { useState } from "react";
import { axiosRegister } from "../Api/axios";

const NuevoUsuario = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");

    try {
      const response = await axiosRegister.post("/register", {
        user: username,
        mail: email,
        password: password,
      });

      setSuccessMessage("Usuario registrado con éxito.");
      console.log("Respuesta del servidor:", response.data);

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error(
        "Error al registrar el usuario:",
        err.response?.data || err
      );
      setError(err.response?.data?.message || "Hubo un error al registrar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 font-sans ">
      <h1 className="text-4x1 md:text-5xl font-extrabold text-gray-800 mb-8 text-center [text-shadow:_1px_1px_2px_rgba(0,0,0,0.2)]">
        Registrarse
      </h1>
      <div className="w-full max-w-lg mx-auto p-6 md:p-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-x1 border border-gray-200">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray-700 self-start"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 self-start"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 self-start"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crea una contraseña"
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-gray-700 self-start"
            >
              Confirmar contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite la contraseña"
              className="w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm"
            />
          </div>
          {error && (
            <p className="text-green-600 bg-green-100 p-2 rounded-md text-sm font-medium text-center">
              {error}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 bg-green-100 p-2 rounded-md text-sm font-medium text-center">
              {successMessage}
            </p>
          )}
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevoUsuario;
