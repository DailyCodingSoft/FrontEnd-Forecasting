import axios from "axios";

export const api = axios.create({
  baseURL: "https://dailycoding.online/api",
  headers: {
    "Content-Type": "application/json",
  },
});