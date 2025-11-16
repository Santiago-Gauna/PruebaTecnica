import React, { useState } from "react";

const TareasModal = ({ tarea, onClose, removeTask, onEdit }) => {
  const [editData, setEditData] = useState({ ...tarea });
  const [isEditing, setIsEditing] = useState(false);
  console.log(editData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEdit = () => {
    onEdit(editData);
    setIsEditing(false);
    onClose();
  };
  const handleRemoveTask = async (taskId) => {
    try {
      await removeTask(taskId);
      console.log("Tarea eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la tarea", error);
    }
  };
  const toggleEditMode = () => {
    setIsEditing(true);
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setEditData({ ...editData, status: value });
  };

  return (
    <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-lg p-5 w-11/12 max-w-sm shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">Detalles de Tarea</h2>
        <label className="flex flex-col mb-4 text-left text-sm text-gray-600">
          Título:
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className="p-2 mt-1 text-base border border-gray-300 rounded-md outline-none transition duration-200 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed "
            disabled={!isEditing}
          />
        </label>
        <label className="flex flex-col mb-4 text-left text-sm text-gray-600">
          Descripción:
          <textarea
            name="description"
            value={editData.description || ""}
            onChange={handleChange}
            className="p-2 mt-1 text-base border border-gray-300 rounded-md outline-none transition duration-200 focus:border-blue-500 resize-none h-20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={!isEditing}
          />
        </label>

        <label className="flex flex-col mb-6 text-left text-sm text-gray-600">
          Estado:
          <select
            name="status"
            value={editData.status}
            onChange={handleStatusChange}
            className="p-2 mt-1 text-base border border-gray-300 rounded-md outline-none transition duration-200 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={!isEditing}
          >
            <option value="pendientes">Pendiente</option>
            <option value="enProceso">En Proceso</option>
            <option value="completadas">Completada</option>
          </select>
        </label>

        <div className="flex justify-between gap-3">
          {!isEditing ? (
            <button onClick={toggleEditMode} className="flex-1 p-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer transition duration-200 hover:bg-blue-700">
              Editar
            </button>
          ) : (
            <button onClick={handleEdit} className="flex-1 p-2 bg-blue-500 text-white rounded-md text-sm cursor-pointer transition duration-200 hover:bg-blue-700">
              Guardar
            </button>
          )}
          <button
            onClick={() => {
              handleRemoveTask(tarea._id);
              onClose();
            }}
            className="flex-1 p-2 bg-red-600 text-white rounded-md text-sm cursor-pointer transition duration-200 hover:bg-red-800"
          >
            Eliminar
          </button>
          <button onClick={onClose} className="flex-1 p-2 bg-gray-400 text-white rounded-md text-sm cursor-pointer transition duration-200 hover:bg-gray-600">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TareasModal;
