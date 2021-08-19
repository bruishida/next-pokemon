export default function Pokemon({ pokemon }) {
  return (
    <div>
      <pre>{JSON.stringify(pokemon, null, 2)}</pre>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const { results: pokemons } = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = pokemons.map((pokemon) => ({
    params: { name: pokemon.name },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();
  console.log("revalidate!!!!");
  return {
    props: {
      pokemon,
    },
    revalidate: 2,
  };
}
