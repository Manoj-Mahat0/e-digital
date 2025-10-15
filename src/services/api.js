// src/services/api.js
import axios from "axios";

const API_HOST = "https://be.edigital.globalinfosofts.com";

const api = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default api;
