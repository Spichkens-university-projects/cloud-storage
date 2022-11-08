import axios from "axios";


export const API_HOST = process.env.API_HOST;

export const axiosClassic = axios.create({
  baseURL: API_HOST,
  headers: { "Content-Type": "application/json" }
});