import React, { useState, useEffect } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
import TareasModal from "../Modales/TareasModal";
import { axiosGet, axiosPut, axiosDelete } from "../Api/axios";
import classes from "../Estilos/ListasdeTareas.module.css";

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
      <div className={classes.taskContainer}>
        {/* Tareas Pendientes */}
        <div className={classes.container}>
          <div className={classes.card}>
            <h1>Pendientes</h1>
            <div>
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
        </div>

        {/* Tareas en Proceso */}
        <div className={classes.container}>
          <div className={classes.card}>
            <h1>En Proceso</h1>
            <div>
              {taskEnProceso.length > 0 ? (
                taskEnProceso.map((item) => (
                  <div
                    key={item._id}
                    className={classes.tarea}
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
        </div>

        {/* Tareas Completadas */}
        <div className={classes.container}>
          <div className={classes.card}>
            <h1>Completadas</h1>
            <div>
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
