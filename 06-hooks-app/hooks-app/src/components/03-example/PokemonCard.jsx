const PokemonCard = ({ id, name = "Unknown Pokémon", sprites = [] }) => {
    return (
        <section style={{ height: 200 }}>
            <h2 className="text-capitalize">#{id} - {name}</h2>

            <div>
                {sprites.length > 0 ? (
                    sprites.map((sprite, index) => (
                        <img key={index} src={sprite} alt={name} />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </section>
    );
};

export default PokemonCard;
