import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};
