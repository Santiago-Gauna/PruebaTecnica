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
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Pendientes</h1>
        <div className={classes.taskList}>
          {taskPendientes.length > 0 ? (
            taskPendientes.map((item) => (
              <div
                key={item.id}
                className={classes.tarea}
                onClick={() => handleTaskClick(item)}
              >
                <span>{item.title}</span>
              </div>
            ))
          ) : (
            <p>No hay tareas pendientes.</p>
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
