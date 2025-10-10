// src/App.jsx
import { useState, useEffect } from "react";
import {
  getTarefas,
  createTarefa,
  deleteTarefa,
  updateTarefa,
} from "./services/api";
import "./App.css";

function App() {
  // =================================================================================
  // ESTADO E EFEITOS NO REACT
  // =================================================================================
  // Para componentes que consomem APIs, geralmente precisamos de 3 estados:
  // 1. O estado para armazenar os dados recebidos (`tarefas`).
  // 2. Um estado de 'loading' para dar feedback ao usuário enquanto os dados são buscados.
  // 3. Um estado de 'error' para lidar com falhas na comunicação.
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novaTarefaTitulo, setNovaTarefaTitulo] = useState("");

  // O Hook `useEffect` é o lugar ideal para "efeitos colaterais", como chamadas de API.
  // A função dentro do useEffect será executada APÓS o componente ser renderizado.
  useEffect(() => {
    // =================================================================================
    // CONSUMINDO API (GET) com ASYNC/AWAIT
    // =================================================================================
    // Criamos uma função async aqui dentro para poder usar 'await'.
    const buscarDados = async () => {
      try {
        setLoading(true); // Inicia o loading
        setError(null); // Limpa erros anteriores

        // `await` pausa a execução da função até que a Promise de getTarefas seja resolvida.
        const dados = await getTarefas();
        // console.log(dados);
        setTarefas(dados); // Armazena os dados no estado
      } catch (erro) {
        // Se a Promise for rejeitada (ex: erro de rede), o 'catch' é executado.
        setError("Falha ao buscar as tarefas.");
        console.error(erro);
      } finally {
        // O `finally` é executado independentemente de sucesso ou falha.
        // É o lugar perfeito para parar o 'loading'.
        setLoading(false);
      }
    };

    buscarDados();
    // O array de dependências vazio `[]` faz com que este useEffect seja executado
    // apenas UMA VEZ, quando o componente é "montado" (aparece na tela pela primeira vez).
  }, []);

  // =================================================================================
  // EXEMPLO PRÁTICO (POST)
  // =================================================================================
  const handleAddTarefa = async (event) => {
    event.preventDefault();
    if (!novaTarefaTitulo.trim()) return;

    const novaTarefa = {
      userId: 1,
      title: novaTarefaTitulo,
      completed: false,
    };

    try {
      const tarefaCriada = await createTarefa(novaTarefa);
      // Após criar na API, atualizamos nosso estado local para a UI refletir a mudança.
      setTarefas([tarefaCriada, ...tarefas]);
      setNovaTarefaTitulo(""); // Limpa o input
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
      // Em um app real, mostraríamos uma notificação de erro para o usuário.
    }
  };

  // =================================================================================
  // EXEMPLO PRÁTICO (DELETE)
  // =================================================================================
  const handleDeleteTarefa = async (id) => {
    try {
      const result = await deleteTarefa(id);
      // console.log(result.status);
      // Após deletar na API, atualizamos o estado local filtrando a tarefa removida.
      setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  // =================================================================================
  // TÓPICO NOVO: HANDLER PARA ATUALIZAR A TAREFA
  // =================================================================================
  const handleToggleComplete = async (id) => {
    // 1. Encontrar a tarefa que será atualizada no nosso estado atual
    const tarefaParaAtualizar = tarefas.find((tarefa) => tarefa.id === id);
    if (!tarefaParaAtualizar) return;

    // 2. Criar o objeto da tarefa com o status 'completed' invertido
    const tarefaAtualizada = {
      ...tarefaParaAtualizar,
      completed: !tarefaParaAtualizar.completed,
    };

    try {
      // 3. Chamar a função da API para enviar a requisição PUT
      const resposta = await updateTarefa(id, tarefaAtualizada);

      // 4. Atualizar o estado local com os dados retornados pela API
      // Usamos .map() para criar um novo array, substituindo apenas a tarefa que mudou.
      setTarefas(
        tarefas.map((tarefa) => (tarefa.id === id ? resposta : tarefa))
      );
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
      // Em um app real, poderíamos reverter a mudança na UI ou mostrar um erro.
    }
  };

  // --- Renderização Condicional ---
  if (loading) {
    return <div className="loading">Carregando tarefas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas (API)</h1>

      <form className="form-add" onSubmit={handleAddTarefa}>
        <input
          type="text"
          value={novaTarefaTitulo}
          onChange={(e) => setNovaTarefaTitulo(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul className="task-list">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`task-item ${tarefa.completed ? "completed" : ""}`}
          >
            <div>
              <input
                type="checkbox"
                checked={tarefa.completed}
                onChange={() => handleToggleComplete(tarefa.id)}
              />
              <span>{tarefa.title}</span>
            </div>

            <button onClick={() => handleDeleteTarefa(tarefa.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
