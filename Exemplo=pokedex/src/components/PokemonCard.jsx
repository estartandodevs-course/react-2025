// src/components/PokemonCard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonDetails } from "../service/pokedex.service";

// Este componente recebe o nome de um Pokémon e busca seus próprios detalhes
// para exibir a imagem, já que a lista principal não nos dá essa informação.
function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getPokemonDetails(pokemonName);
        setPokemon(details);
      } catch (error) {
        console.error("Falha ao buscar detalhes do Pokémon:", error);
      }
    };
    fetchDetails();
  }, [pokemonName]);

  if (!pokemon) {
    return <div className="pokemon-card loading">Carregando...</div>;
  }

  return (
    // O card inteiro é um link para a página de detalhes
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </Link>
  );
}

export default PokemonCard;
