import axios from "axios";


export const API_HOST = `http://${process.env.API_HOST}:${process.env.API_PORT}/api`;

export const axiosClassic = axios.create({
  baseURL: API_HOST,
  headers: { "Content-Type": "application/json" }
});