import React, { useEffect, useState } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
import { axiosGet } from "../Api/axios";

const Estadisticas = () => {
  const [Pendientes, setTasksPendientes] = useState([]);
  const [EnProceso, setTasksEnProceso] = useState([]);
  const [Completadas, setTasksCompletadas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axiosGet.get("/todos");
        const tareas = response.data.data;

        setTasksPendientes(
          tareas.filter((task) => task.status === "pendientes")
        );

        setTasksEnProceso(tareas.filter((task) => task.status === "enProceso"));

        setTasksCompletadas(
          tareas.filter((task) => task.status === "completadas")
        );
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTareas();
  }, []);

  return (
    <div>
      <Title />
      <NavTodoList />
      <div className="flex flex-col items-center p-5">
        <h2 className="text-4xl font-boldtext-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-16">Estadísticas de Tareas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div className="bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 ease-in-out hover:transform hover:-translate-y-1 min-h-64 flex flex-col justify-center">
            <h3 className="text-3xl mb-2 text-[#334e68]">Pendientes</h3>
            <p className="text-3xl font-bold text-[#0078d4]">{Pendientes.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 ease-in-out hover:transform hover:-translate-y-1 flex flex-col justify-center">
            <h3 className="text-3xl mb-2 text-[#334e68]">En Proceso</h3>
            <p className="text-3xl font-bold text-[#0078d4]">{EnProceso.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 text-center transition duration-200 ease-in-out hover:transform hover:-translate-y-1 flex flex-col justify-center">
            <h3 className="text-3xl mb-2 text-[#334e68]">Completadas</h3>
            <p className="text-3xl font-bold text-[#0078d4]">{Completadas.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
