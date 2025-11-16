import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./Componentes/Login";
import NuevaTarea from "./Componentes/NuevaTarea";
import NuevoUsuario from "./Componentes/NuevoUsuario";
import ListadeTareas from "./Componentes/ListasdeTareas";
import Estadisticas from "./Componentes/Estadisticas";
import { TaskProvider } from "./Componentes/TareasContext";
import PrivateRoute from "./Componentes/PrivateRoute";
import Error404 from "./Componentes/Error404";

function App() {
  return (
    <TaskProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Registro" element={<NuevoUsuario />} />
          <Route element={<PrivateRoute />}>
            <Route path="/NuevaTarea" element={<NuevaTarea />} />
            <Route path="/ListadeTareas" element={<ListadeTareas />} />
            <Route path="/Estadisticas" element={<Estadisticas />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </TaskProvider>
  );
}

export default App;
