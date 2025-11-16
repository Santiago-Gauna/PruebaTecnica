import React from "react";
import { Link } from "react-router-dom";

const NavTodoList = () => {
  return (
    <nav
      className="
  flex justify-around items-center w-full py-4 
  bg-gray-50 border-t border-gray-200 
  relative bottom-0 mb-8 
  md:flex-nowrap flex-wrap px-4
"
    >
      <Link
        to="/ListadeTareas"
        className="
    text-decoration-none text-xl font-semibold text-blue-900 
    bg-transparent border-none p-2 md:px-4 cursor-pointer 
    transition-colors duration-200 ease-in-out rounded-md 
    
    hover:text-blue-700 /* color: #357ab7; */

    flex-1 md:flex-auto m-2 md:m-0 text-center
  "
      >
        Listas de Tareas
      </Link>
      <Link
        to="/NuevaTarea"
        className="
    text-decoration-none text-xl font-semibold text-blue-900 
    bg-transparent border-none p-2 md:px-4 cursor-pointer 
    transition-colors duration-200 ease-in-out rounded-md 
    
    hover:text-blue-700 

    flex-1 md:flex-auto m-2 md:m-0 text-center
  "
      >
        Agregar Nueva Tarea
      </Link>
      <Link
        to="/Estadisticas"
        className="
    text-decoration-none text-xl font-semibold text-blue-900 
    bg-transparent border-none p-2 md:px-4 cursor-pointer 
    transition-colors duration-200 ease-in-out rounded-md 
    
    hover:text-blue-700 

    flex-1 md:flex-auto m-2 md:m-0 text-center
  "
      >
        Estadisticas
      </Link>
    </nav>
  );
};

export default NavTodoList;
