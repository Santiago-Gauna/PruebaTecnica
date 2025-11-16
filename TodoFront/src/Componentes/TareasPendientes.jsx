import React, { useState, useEffect } from "react";
import TareasModal from "../Modales/TareasModal";
import classes from "../Estilos/TareasPendientes.module.css";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios";

const TareasPendientes = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskPendientes, setTaskPendientes] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axiosGet.get("/todos");
        const tareas = response.data.data;
        const tareasPendientes = tareas.filter(
          (task) => task.status === "pendientes"
        );
        setTaskPendientes(tareasPendientes);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTareas();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const updateTask = async (updatedTask) => {
    try {
      await axiosPut.put(`/todos/${updatedTask._id}`, updatedTask);

      setTaskPendientes((prevTasks) =>
        prevTasks.map((tarea) =>
          tarea._id === updatedTask._id ? updatedTask : tarea
        )
      );
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };
  const removeTask = async (taskId) => {
    try {
      const response = await axiosDelete.delete(`/todos/${taskId}`);
      console.log("Tarea eliminada con éxito:", response.data);
    } catch (error) {
      console.log("Error al Eliminar la Tarea", error);
    }
  };
  return (
    <div className="w-full lg:w-1/3 bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      <div className="flex flex-col bg-white rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
        <h1 className="text-2xl font-semibold text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-3 text-center">Pendientes</h1>
        <div className="flex flex-col gap-2">
          {taskPendientes.length > 0 ? (
            taskPendientes.map((item) => (
              <div
                key={item.id}
                className="flex justify-center items-center bg-[#eaf4fc] border border-[#cce0f5] w-full rounded-lg p-3 text-lg text-gray-700 cursor-pointer transition-colors duration-200 hover:bg-[#d8eafd]"
                onClick={() => handleTaskClick(item)}
              >
                <span>{item.title}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic mt-2">No hay tareas pendientes.</p>
          )}
        </div>
      </div>
      {selectedTask && (
        <TareasModal
          tarea={selectedTask}
          onClose={() => setSelectedTask(null)}
          removeTask={removeTask}
          onEdit={updateTask}
        />
      )}
    </div>
  );
};

export default TareasPendientes;
