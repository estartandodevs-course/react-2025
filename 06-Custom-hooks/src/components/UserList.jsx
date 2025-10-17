import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

function UserList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <p className="status-message">Carregando usuários...</p>;
  if (error) return <p className="status-message">{error}</p>;

  return (
    <div className="panel">
      <h2>Lista de Usuários</h2>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
