import React, { useState } from "react";
import classes from "../Estilos/TareasModal.module.css";

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
    <div className={classes.modalOverlay}>
      <div className={classes.modalContent}>
        <h2 className={classes.title}>Detalles de Tarea</h2>
        <label className={classes.inputLabel}>
          Título:
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
            className={classes.input}
            disabled={!isEditing}
          />
        </label>
        <label className={classes.inputLabel}>
          Descripción:
          <textarea
            name="description"
            value={editData.description || ""}
            onChange={handleChange}
            className={classes.input}
            disabled={!isEditing}
          />
        </label>

        <label className={classes.inputLabel}>
          Estado:
          <select
            name="status"
            value={editData.status}
            onChange={handleStatusChange}
            className={classes.input}
            disabled={!isEditing}
          >
            <option value="pendientes">Pendiente</option>
            <option value="enProceso">En Proceso</option>
            <option value="completadas">Completada</option>
          </select>
        </label>

        <div className={classes.AccionesForm}>
          {!isEditing ? (
            <button onClick={toggleEditMode} className={classes.button}>
              Editar
            </button>
          ) : (
            <button onClick={handleEdit} className={classes.button}>
              Guardar
            </button>
          )}
          <button
            onClick={() => {
              handleRemoveTask(tarea._id);
              onClose();
            }}
            className={classes.button}
          >
            Eliminar
          </button>
          <button onClick={onClose} className={classes.closeButton}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TareasModal;
