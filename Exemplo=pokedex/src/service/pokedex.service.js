// src/service/pokedex.service.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Busca a lista paginada de Pokémon
export const getPokemons = async (limit = 20, offset = 0) => {
  const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

// Busca os detalhes de um Pokémon específico pelo nome ou ID
export const getPokemonDetails = async (name) => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};

// Busca a lista de todos os tipos de Pokémon
export const getAllTypes = async () => {
  const response = await api.get("/type");
  return response.data;
};

// Busca todos os Pokémon de um tipo específico
export const getPokemonsByType = async (typeName) => {
  const response = await api.get(`/type/${typeName}`);
  // A API retorna os Pokémon dentro de uma propriedade 'pokemon'
  return response.data.pokemon.map((p) => p.pokemon);
};

export default api;
