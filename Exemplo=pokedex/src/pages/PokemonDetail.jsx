// src/pages/PokemonDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails } from "../service/pokedex.service";

function PokemonDetail() {
  const { name } = useParams(); // Hook para pegar o parâmetro ':name' da URL
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const details = await getPokemonDetails(name);
        setPokemon(details);
      } catch (error) {
        console.error("Pokémon não encontrado:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [name]); // Re-executa se o nome na URL mudar

  if (loading) return <p>Carregando detalhes do Pokémon...</p>;
  if (!pokemon) return <h2>Pokémon não encontrado!</h2>;

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-link">
        ← Voltar para a lista
      </Link>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
      <div className="details-section">
        <h2>Tipos</h2>
        <p>{pokemon.types.map((type) => type.type.name).join(", ")}</p>
      </div>
      <div className="details-section">
        <h2>Habilidades</h2>
        <p>
          {pokemon.abilities
            .map((abilitie) => abilitie.ability.name)
            .join(", ")}
        </p>
      </div>
      <div className="details-section">
        <h2>Estatísticas</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PokemonDetail;
