import React, { useState, useEffect } from "react";
import TareasModal from "../Modales/TareasModal";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios";

const TareasEnProceso = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskEnProceso, setTaskEnProceso] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axiosGet.get("/todos");
        const tareas = response.data.data;
        const tareasEnProceso = tareas.filter(
          (task) => task.status === "enProceso"
        );
        setTaskEnProceso(tareasEnProceso);
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

      setTaskCompletadas((prevTasks) =>
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
    <div
      className="w-full lg:w-1/3 bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
      onDragOver={(evt) => evt.preventDefault()}
    >
      <div className="flex flex-col bg-white rounded-lg shadow-md p-4 transition-all duration-200 ease-in-out hover:translate-y-[-5px] hover:shadow-xl">
        <h1 className="text-2xl font-semibold text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-3 text-center">En Proceso</h1>
        <div className="flex flex-col gap-2">
          {taskEnProceso.length > 0 ? (
            taskEnProceso.map((item) => (
              <div
                key={item._id}
                className="flex justify-center items-center bg-[#eaf4fc] border border-[#cce0f5] w-full rounded-lg p-3 text-lg text-gray-700 cursor-pointer transition-colors duration-200 hover:bg-[#d8eafd]"
                draggable
                onDragStart={(evt) =>
                  evt.dataTransfer.setData("itemID", item._id)
                }
                onClick={() => handleTaskClick(item)}
              >
                <span>{item.title}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 italic mt-2">No hay tareas en proceso.</p>
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

export default TareasEnProceso;
