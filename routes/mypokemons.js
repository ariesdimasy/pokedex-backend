const { get_random, random_number } = require("./../helpers/random");
const { primeNumber } = require("./../helpers/primeNumber");

const express = require("express");
const router = express.Router();
const Mypokemon = require("../models/mypokemon");

router.get("/", async (req, res) => {
  const page = req.body.page || 1;
  const index = page - 1 || 0;
  const limit = req.body.limit || 10;

  let myPokemons;
  let myPokemonsLength;
  try {
    myPokemons = await Mypokemon.find()
      .skip(index * limit)
      .limit(limit);

    myPokemonsLength = await Mypokemon.find();

    if (myPokemons == null) {
      res.status(404).json({ message: "Cannot Find Your pokemons" });
    } else {
      res.status(200).json({
        total: myPokemonsLength.length,
        page: page,
        data: myPokemons,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/catch", async (req, res) => {
  const probability = [true, false];
  const chance = get_random(probability);

  const { pokemon_id, name } = req.body.data;

  if (chance === true) {
    const pokemon = new Mypokemon({
      name: name + "-" + "0",
      pokemonId: pokemon_id,
      created_at: Date(),
    });

    try {
      const newPokemon = await pokemon.save();
      res.status(201).json({
        data: newPokemon,
        success: true,
        message: "you successfully catch " + newPokemon.name,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
        success: false,
      });
    }
  } else {
    res.status(201).json({
      message: "Your Catch Fail, Try Again",
      success: false,
    });
  }
});

router.post("/changename/:id", async (req, res) => {});

router.delete("/release/:id", async (req, res) => {
  const isRelease = primeNumber(random_number());

  if (isRelease) {
    try {
      myPokemon = await Mypokemon.deleteOne({
        _id: req.params._id,
      });

      res.status(201).json({
        message: "you sucessfully release this pokemon",
      });
    } catch (err) {
      res.status(400).json(err.message);
    }
  } else {
    res.status(201).json({
      message: "you cant release this pokemon, try again",
    });
  }
});

module.exports = router;
