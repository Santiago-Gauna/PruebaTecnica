import React, { useEffect, useState } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
import classes from "../Estilos/Estadisticas.module.css";
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
      <div className={classes.dashboardContainer}>
        <h2 className={classes.title}>Estadísticas de Tareas</h2>
        <div className={classes.statsGrid}>
          <div className={classes.statCard}>
            <h3 className={classes.statTitle}>Pendientes</h3>
            <p className={classes.statValue}>{Pendientes.length}</p>
          </div>
          <div className={classes.statCard}>
            <h3 className={classes.statTitle}>En Proceso</h3>
            <p className={classes.statValue}>{EnProceso.length}</p>
          </div>
          <div className={classes.statCard}>
            <h3 className={classes.statTitle}>Completadas</h3>
            <p className={classes.statValue}>{Completadas.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
