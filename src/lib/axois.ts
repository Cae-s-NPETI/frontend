import axios from "axios";

export const accountManagement = axios.create({
    baseURL: "http://localhost:21801/api/v1"
});

export const tripHistory = axios.create({
    baseURL: "http://localhost:21802/api/v1"
});

export const tripManagement = axios.create({
    baseURL: "http://localhost:21803/api/v1"
});
