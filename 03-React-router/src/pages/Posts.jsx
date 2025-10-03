// src/pages/Posts.jsx
import { Link } from "react-router-dom";
import { posts } from "../data/postsData"; // Importando nossos dados

function Posts() {
  return (
    <div>
      <h1>Lista de Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            {/*
              Cada título de post é um link para sua rota dinâmica.
              Usamos template literals para construir a URL, como /posts/1, /posts/2, etc.
            */}
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Posts;
