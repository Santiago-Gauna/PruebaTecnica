import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosPost } from "../Api/axios";
const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const addTask = async (newTask) => {
    try {
      const response = await axiosPost.post("/todos", {
        ...newTask,
        status: newTask.status,
      });
    } catch (error) {
      console.error(
        "Error al agregar la tarea:",
        error.response?.data || error
      );
    }
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
