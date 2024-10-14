import axios from "axios";

const API = axios.create({ baseURL: REACT_APP_BACKEND_URL });

export const login = (data) => API.post("/accounts/login/", data);
export const register = (data) => API.post("/accounts/register/", data);
export const getPrograms = () => API.get("/programs/");
