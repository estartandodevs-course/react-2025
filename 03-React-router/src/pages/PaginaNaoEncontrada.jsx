// src/pages/PaginaNaoEncontrada.jsx
import { useLocation } from "react-router-dom";

// =================================================================================
// TÓPICO: HOOK useLocation
// =================================================================================
function PaginaNaoEncontrada() {
  // O hook useLocation() retorna um objeto com informações sobre a URL atual.
  // A propriedade mais útil é 'pathname', que contém o caminho da URL que o usuário tentou acessar.
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <h1>Erro 404 - Página Não Encontrada</h1>
      <p>
        O caminho <code>{location.pathname}</code> que você tentou acessar não
        existe.
      </p>
    </div>
  );
}
export default PaginaNaoEncontrada;
