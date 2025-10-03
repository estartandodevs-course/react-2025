import React, { useState, useEffect } from "react";

function App() {
  // Inicializa o estado já lendo do localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Salva no localStorage sempre que os todos mudarem
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTask.trim() === "") {
      console.log("não tem nada");
      return;
    }

    const novaTarefa = { id: Date.now(), text: newTask, done: false };
    console.log(novaTarefa);
    setTodos([...todos, novaTarefa]);
    setNewTask("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id) => {
    const arrayAlterado = todos.filter((todo) => todo.id !== id);
    setTodos(arrayAlterado);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>✅ Todo List com LocalStorage</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button onClick={addTodo}>Adicionar</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "5px 0" }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
