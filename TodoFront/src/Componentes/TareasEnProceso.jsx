import React, { useState, useEffect } from "react";
import TareasModal from "../Modales/TareasModal";
import classes from "../Estilos/TareasEnProceso.module.css";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios"; // Asegúrate de que axiosPut esté disponible

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
      className={classes.container}
      onDragOver={(evt) => evt.preventDefault()}
    >
      <div className={classes.card}>
        <h1 className={classes.title}>En Proceso</h1>
        <div className={classes.taskList}>
          {taskEnProceso.length > 0 ? (
            taskEnProceso.map((item) => (
              <div
                key={item._id}
                className={classes.tarea}
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
            <p>No hay tareas en proceso.</p>
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
