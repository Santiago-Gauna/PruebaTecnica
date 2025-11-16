import { useState } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
import classes from "../Estilos/NuevaTarea.module.css";
import { useTasks } from "./TareasContext";

const NuevaTarea = () => {
  const { addTask } = useTasks();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddTodo = async () => {
    try {
      const taskStatus = isCompleted ? "completadas" : "pendientes";

      await addTask({
        title: name,
        description: description,
        is_completed: isCompleted,
        status: taskStatus,
      });

      setSuccessMessage("Tarea Agregada Correctamente");
      console.log("Tarea agregada exitosamente");

      setName("");
      setDescription("");
      setIsCompleted(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      console.error("Error al agregar una tarea:", err.response?.data || err);
      setError(
        err.response?.data?.message || "Hubo un error al agregar la tarea."
      );
    }
  };
  return (
    <div>
      <Title />
      <NavTodoList />
      <div className={classes.container}>
        <h1 className={classes.title}>¡¡Añade tus Tareas!!</h1>
        <div className={classes.adddiv}>
          <input
            type="text"
            className={classes.input}
            placeholder="Escribe el nombre de la tarea"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className={classes.input}
            placeholder="Escribe una breve descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className={classes.AccionesForm}>
            <label>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
              Tarea Completa
            </label>
            {error && <p className={classes.error}>{error}</p>}
            {successMessage && (
              <p className={classes.success}>{successMessage}</p>
            )}
            <button className={classes.button} onClick={handleAddTodo}>
              Agrega tu tarea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaTarea;
