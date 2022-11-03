import axios from "axios";


export const API_HOST = `http://192.168.1.11:3001/api`

export const axiosClassic = axios.create({
  baseURL: API_HOST,
  headers: {'Content-Type': 'application/json'}
})