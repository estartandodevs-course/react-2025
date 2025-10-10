// src/services/api.js
import axios from "axios";

// =================================================================================
//BOAS PRÁTICAS - Separar Lógica de API
// =================================================================================
// É uma excelente prática centralizar a configuração da sua API em um único lugar.
// Isso facilita a manutenção, especialmente se a URL base mudar ou se

// 1. Centralizar a URL Base
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// 2. Criar funções de serviço para cada endpoint
// Cada função é responsável por uma única operação na API (GET, POST, etc.)

// Busca todas as tarefas (limitado a 15 para o exemplo)
export const getTarefas = async () => {
  const response = await api.get("/todos?_limit=15");
  return response.data;
};

// Cria uma nova tarefa
export const createTarefa = async (novaTarefa) => {
  const response = await api.post("/todos", novaTarefa);
  return response.data;
};

// Deleta uma tarefa
export const deleteTarefa = async (id) => {
  const response = api.delete(`/todos/${id}`);
  return response; // Retorna o ID para facilitar a atualização do estado
};

export const updateTarefa = async (id, tarefaAtualizada) => {
  // A requisição PUT recebe o ID do recurso na URL e o objeto completo
  // com as novas informações no corpo da requisição.
  const response = await api.put(`/todos/${id}`, tarefaAtualizada);
  return response.data; // A API retorna a tarefa atualizada
};
