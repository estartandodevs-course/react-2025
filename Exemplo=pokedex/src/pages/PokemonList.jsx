// src/pages/PokemonList.jsx
import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import {
  getPokemons,
  getAllTypes,
  getPokemonsByType,
} from "../service/pokedex.service";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0); // Para controle da paginação
  const [searchTerm, setSearchTerm] = useState(""); // Para o filtro de busca
  const [types, setTypes] = useState([]); // Para a lista de tipos
  const [selectedType, setSelectedType] = useState(""); // Para o filtro de tipo

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      if (selectedType) {
        // TÓPICO: FILTRAR POR TIPO
        const pokemonsOfType = await getPokemonsByType(selectedType);
        setPokemons(pokemonsOfType);
      } else {
        // TÓPICO: LISTAR POKÉMONS PAGINADOS
        const data = await getPokemons(20, offset);
        setPokemons(data.results);
      }
      // Carrega os tipos apenas uma vez
      if (types.length === 0) {
        const typesData = await getAllTypes();
        setTypes(typesData.results);
      }
      setLoading(false);
    };

    loadInitialData();
  }, [offset, selectedType]); // Re-executa o efeito quando o offset ou o tipo selecionado mudam

  // TÓPICO: FILTRO PARA BUSCAR POKÉMON PELO NOME
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar Pokémon pelo nome..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="type-filters">
          <button
            onClick={() => {
              setSelectedType("");
              setOffset(0);
            }}
          >
            Todos
          </button>
          {types.map((type) => (
            <button key={type.name} onClick={() => setSelectedType(type.name)}>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="pokemon-grid">
            {filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
            ))}
          </div>

          {/* Só mostra paginação se não estiver filtrando por tipo */}
          {!selectedType && (
            <div className="pagination">
              <button
                onClick={() => setOffset(Math.max(0, offset - 20))}
                disabled={offset === 0}
              >
                Anterior
              </button>
              <button onClick={() => setOffset(offset + 20)}>Próxima</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PokemonList;
