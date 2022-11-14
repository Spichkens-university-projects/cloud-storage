import axios from 'axios';

export const API_SERVER = `http://${process.env.API_HOST}:${process.env.API_PORT}/api`;

export const axiosClassic = axios.create({
    baseURL: API_SERVER,
    headers: { 'Content-Type': 'application/json' },
});
