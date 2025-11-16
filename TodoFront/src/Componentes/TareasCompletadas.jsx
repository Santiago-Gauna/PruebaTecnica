import React, { useState, useEffect } from "react";
import TareasModal from "../Modales/TareasModal";
import classes from "../Estilos/TareasCompletadas.module.css";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios"; // Asegúrate de que axiosPut esté disponible

const TareasCompletadas = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskCompletadas, setTaskCompletadas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const response = await axiosGet.get("/todos");
        const tareas = response.data.data;
        const tareasCompletadas = tareas.filter(
          (task) => task.status === "completadas"
        );
        setTaskCompletadas(tareasCompletadas);
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
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.title}>Completadas</h1>
        <div className={classes.taskList}>
          {taskCompletadas.length > 0 ? (
            taskCompletadas.map((item) => (
              <div
                key={item._id}
                className={classes.tarea}
                onClick={() => handleTaskClick(item)}
              >
                <span>{item.title}</span>
              </div>
            ))
          ) : (
            <p>No hay tareas completadas.</p>
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

export default TareasCompletadas;
