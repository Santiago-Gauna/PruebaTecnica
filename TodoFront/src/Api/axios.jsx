import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://backend:3000/api/",
});

const axiosRegister = axios.create({
  baseURL: "http://backend:3000/api/login/",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosLogin = axios.create({
  baseURL: "http://backend:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPost = axios.create({
  baseURL: "http://backend:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosGet = axios.create({
  baseURL: "http://backend:3000/api/",
});

const axiosPut = axios.create({
  baseURL: "http://backend:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosDelete = axios.create({
  baseURL: "http://backend:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

const addAuthorizationHeader = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);

axiosPut.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
axiosPost.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
axiosGet.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
axiosDelete.interceptors.request.use(addAuthorizationHeader, (error) =>
  Promise.reject(error)
);
export {
  axiosInstance,
  axiosPost,
  axiosGet,
  axiosRegister,
  axiosLogin,
  axiosPut,
  axiosDelete,
};
