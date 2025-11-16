import { useState } from "react";
import Title from "./Title";
import NavTodoList from "./NavTodoList";
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
      <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-5 box-border rounded-xl">
        <h1 className="text-4xl font-boldtext-[#334e68] [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] mb-16">
          ¡¡Añade tus Tareas!!
        </h1>
        <div className="w-full text-center">
          <input
            type="text"
            className="w-full p-3 my-2 border-2 border-[#395886] rounded-md text-base text-gray-800 bg-white outline-none transition duration-300 ease-in-out focus:border-[#357ab7] box-border"
            placeholder="Escribe el nombre de la tarea"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 my-2 border-2 border-[#395886] rounded-md text-base text-gray-800 bg-white outline-none transition duration-300 ease-in-out focus:border-[#357ab7] box-border"
            placeholder="Escribe una breve descripcion"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <label className="flex items-center cursor-pointer select-none text-gray-700">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={(e) => setIsCompleted(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`h-6 w-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${isCompleted ? "bg-[#395886] border-[#395886]": "bg-gray-200 border-gray-400"}`}>
                  {isCompleted && (
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="ml-3 text-lg font-medium">Tarea Completa</span>
            </label>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {successMessage && (
              <p className="text-green-600 text-sm mt-1">{successMessage}</p>
            )}
            <button
              className="px-4 py-2 bg-[#395886] text-white rounded-md text-base cursor-pointer transition duration-300 ease-in-out hover:bg-[#357ab7]"
              onClick={handleAddTodo}
            >
              Agrega tu tarea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaTarea;
