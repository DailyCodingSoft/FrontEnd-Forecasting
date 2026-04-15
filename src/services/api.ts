import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.tu-backend.com",
  headers: {
    "Content-Type": "application/json",
  },
});