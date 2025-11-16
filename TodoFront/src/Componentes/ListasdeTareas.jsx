import React, { useState, useEffect } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
import TareasModal from "../Modales/TareasModal";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios";

const ListadeTareas = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskCompletadas, setTaskCompletadas] = useState([]);
  const [taskPendientes, setTaskPendientes] = useState([]);
  const [taskEnProceso, setTaskEnProceso] = useState([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axiosGet("/todos");
        const tareas = response.data.data;
        console.log(tareas);
        setTaskCompletadas(
          tareas.filter((task) => task.status === "completadas")
        );
        setTaskPendientes(
          tareas.filter((task) => task.status === "pendientes")
        );
        setTaskEnProceso(tareas.filter((task) => task.status === "enProceso"));
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };
    fetchTareas();
  }, [reloadTrigger]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const updateTask = async (updatedTask) => {
    try {
      await axiosPut.put(`/todos/${updatedTask._id}`, updatedTask);
      console.log("Tarea actualizada con éxito.");
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const removeTask = async (taskId) => {
    try {
      await axiosDelete.delete(`/todos/${taskId}`);
      console.log("Tarea eliminada con éxito.");
      setReloadTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div>
      <Title />
      <NavTodoList />
      <div className="flex flex-col md:flex-row justify-between gap-4 w-full p-4 box-border">
        <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow-sm p-4 box-border">
          <div className="flex flex-col bg-white rounded-lg shadow-md p-4 transition duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-xl font.semibold text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-2 text-center">Pendientes</h1>
            <div className="flex flex-col gap-2">
              {taskPendientes.length > 0 ? (
                taskPendientes.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-center items-center bg-[#eaf4fc] border border-[#cce0f5] w-full rounded p-3 text-lg text-gray-800 transition duration-200 ease-in-out hover:bg-[#d8eafd] cursor pointer"
                    onClick={() => handleTaskClick(item)}
                  >
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-2">No hay tareas pendientes.</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow-sm p-4 box-border">
          <div className="flex flex-col bg-white rounded-lg shadow-md p-4 transition duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-xl font.semibold text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-2 text-center">En Proceso</h1>
            <div className="flex flex-col gap-2">
              {taskEnProceso.length > 0 ? (
                taskEnProceso.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-center items-center bg-[#eaf4fc] border border-[#cce0f5] w-full rounded p-3 text-lg text-gray-800 transition duration-200 ease-in-out hover:bg-[#d8eafd] cursor pointer"
                    onClick={() => handleTaskClick(item)}
                  >
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-2">No hay tareas en proceso.</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-gray-50 rounded-lg shadow-sm p-4 box-border">
          <div className="flex flex-col bg-white rounded-lg shadow-md p-4 transition duration-200 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg">
            <h1 className="text-xl font.semibold text-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-2 text-center">Completadas</h1>
            <div className="flex flex-col gap-2">
              {taskCompletadas.length > 0 ? (
                taskCompletadas.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-center items-center bg-[#eaf4fc] border border-[#cce0f5] w-full rounded p-3 text-lg text-gray-800 transition duration-200 ease-in-out hover:bg-[#d8eafd] cursor pointer"
                    onClick={() => handleTaskClick(item)}
                  >
                    <span>{item.title}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-2">No hay tareas completadas.</p>
              )}
            </div>
          </div>
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

export default ListadeTareas;
