# To-Do App
Este proyecto es una aplicación fullstack para gestionar tareas (To-Do App).
Incluye un frontend en React, un backend en Node.js/Express y una base de datos MongoDB, todo orquestado con Docker Compose.

## Tecnilogías Utilizadas

**Frontend:** React 

**Estilos:** Tailwind CSS

**Backend:** Node.js + Express

**Base de datos:** MongoDB

**Contenedores:** Docker

## Funcionalidades de la App

**Añadir Tareas:** Crear nuevas tareas con un nombre y una descripción

**Filtro de Tareas:** Ver todas tus tareas sin importar en que estado se encuentren 

**Eliminar Tareas:** Posibilidad de eliminar las tareas que necesites

**Detalles en Modal:** Poder ver los detalles de la tarea en el modal, dandole click a la tarea

## Como Usar

Instalar Node.js
Clonar este repositorio: git clone https://github.com/Santiago-Gauna/PruebaTecnica

Entrar a la carpeta de /TodoBack y ejecutar el comando npm install

Entrar a la carpeta de /TodoFront y ejecutar el comando npm install

En la raiz del proyecto ejecutar el comando docker compose up -d (esto te generará los contenedores con el back, front y la base de datos)

Una vez tengamos echo esto tenemos que acceder a http://localhost:5173/ 

Con estos pasos tendriamos la aplicación corriendo perfectamente.

