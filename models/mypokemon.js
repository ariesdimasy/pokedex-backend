const monggose = require("mongoose");

const mypokemonSchema = new monggose.Schema({
  name: {
    type: String,
    required: true,
  },
  pokemonId: {
    type: Number,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
  },
});

module.exports = monggose.model("Mypokemon", mypokemonSchema);
