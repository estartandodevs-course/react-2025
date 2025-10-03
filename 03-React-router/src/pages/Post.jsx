// src/pages/Post.jsx
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/postsData";

// =================================================================================
// TÓPICO: HOOK useParams
// =================================================================================
function Post() {
  // O hook useParams() retorna um objeto com os parâmetros da rota dinâmica.
  // Se a nossa rota é "/posts/:id", useParams() retornará { id: "valor_na_url" }.
  const { id } = useParams();

  // Usamos o 'id' da URL para encontrar o post correspondente no nosso array de dados.
  // Note que o 'id' da URL é uma string, então o convertemos para número com parseInt.
  const post = posts.find((p) => p.id === parseInt(id));

  // Se o post não for encontrado, podemos exibir uma mensagem.
  if (!post) {
    return (
      <div>
        <h2>Post não encontrado!</h2>
        <Link to="/posts">Voltar para a lista de posts</Link>
      </div>
    );
  }

  return (
    <div className="post-container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/posts">Voltar para a lista de posts</Link>
    </div>
  );
}
export default Post;
