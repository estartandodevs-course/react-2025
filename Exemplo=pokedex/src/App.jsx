// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import PokemonList from "./pages/PokemonList";
import PokemonDetail from "./pages/PokemonDetail";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/">
          <h1>Pokédex React</h1>
        </Link>
      </header>
      <main>
        <Routes>
          {/* Rota principal que renderiza a lista de Pokémon */}
          <Route path="/" element={<PokemonList />} />
          {/* Rota dinâmica para os detalhes de um Pokémon específico */}
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
