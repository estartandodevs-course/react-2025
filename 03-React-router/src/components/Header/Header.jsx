import { Link } from "react-router-dom";
import "./Header.css";

// =================================================================================
// TÓPICO: CRIANDO MENU E NAVEGANDO ENTRE ROTAS
// =================================================================================
function Header() {
  return (
    <nav className="menu">
      <Link to="/">Home</Link>
      <Link to="/sobre">Sobre</Link>
      <Link to="/posts">Posts</Link>
    </nav>
  );
}

export default Header;
