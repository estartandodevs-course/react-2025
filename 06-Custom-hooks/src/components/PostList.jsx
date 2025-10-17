import { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

function PostList() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  if (loading) return <p className="status-message">Carregando posts...</p>;
  if (error) return <p className="status-message">{error}</p>;

  return (
    <div className="panel">
      <h2>Últimos Posts</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
