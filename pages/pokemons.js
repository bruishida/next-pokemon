import Link from "next/link";

export default function Pokemons({ pokemons, count }) {
  return (
    <div>
      <h1>Pokemons</h1>
      <h2>Total: {count}</h2>
      <br />
      {pokemons.map((pokemon, index) => (
        <Link href={`/pokemon/${pokemon.name}`}>
          <div>
            <h3>{pokemon.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const { results: pokemons, count } = await res.json();

  return {
    props: {
      pokemons,
      count,
    },
  };
}
