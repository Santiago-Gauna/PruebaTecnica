import React, { useState } from "react";
import { axiosLogin } from "../Api/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [mail, setMail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (mail === "" || contraseña === "") {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosLogin.post("/login", {
        mail: mail,
        password: contraseña,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);

      setMail("");
      setContraseña("");
      setError("");

      navigate("/ListadeTareas");
    } catch (err) {
      console.error("Error al iniciar sesión", err.response?.data || err);
      setError(err.response?.data?.error || "Credenciales inválidas.");
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen font-['Franklin Gothic Medium','Arial Narrow',Arial,sans-serif] p-4 sm:p-8"
      style={{ fontSize: "2rem" }}
    >
      <h1
        className="mb-12 text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]"
        style={{ marginBottom: "3rem" }}
      >
        Iniciar Sesión
      </h1>
      <form
        className="w-full max-w-[500px] h-auto mx-auto p-5 bg-[#f9f9f9a8] rounded-lg shadow-xl flex flex-col gap-[15px]
                   md:p-5 sm:p-4 xs:p-3"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#334e68]" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="m-[0.5rem] p-3 border border-[#ccc] rounded-md  text-sm box-border focus:border-[#4b90e2] focus:outline-none 
                       sm:text-sm sm:p-2.5 xs:text-xs xs:p-2"
            type="email"
            value={mail}
            onChange={(evt) => setMail(evt.target.value)}
            name="email"
            id="email"
            placeholder="Coloque su correo"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#334e68]" htmlFor="Contraseña">
            Contraseña
          </label>
          <input
            className="m-[0.5rem] p-3 border border-[#ccc] rounded-md  text-sm box-border focus:border-[#4b90e2] focus:outline-none
                        sm:p-2.5 xs:text-xs xs:p-2"
            type="password"
            value={contraseña}
            onChange={(evt) => setContraseña(evt.target.value)}
            name="Contraseña"
            id="Contraseña"
            placeholder="Coloque su Contraseña"
          />
        </div>
        <button
          className="font-semibold p-3 bg-[#4b90e2] text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-[#357ab7]
                     sm:text-base sm:p-2.5 xs:text-sm xs:p-2"
          type="submit"
        >
          Inicia Sesión
        </button>
        <Link
          className="font-semibold p-3 bg-[#4b90e2] text-white border-none rounded-md text-base cursor-pointer transition-colors duration-300 hover:bg-[#357ab7]
                     sm:text-base sm:p-2.5 xs:text-sm xs:p-2 no-underline text-center"
          to="/Registro"
        >
          Registrarte
        </Link>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
