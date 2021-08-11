const dbClient = require("./client");
dbClient.connect();

const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await dbClient.query("SELECT * FROM characters;");
    const characters = result.rows;
    res.send(characters);
});

router.get("/:letter", async (req, res) => {
    const result = await dbClient.query(`SELECT * FROM characters WHERE name LIKE '${req.params.letter}%';`);
    const characters = result.rows;
    res.send(characters);
});

router.post('/', async (req, res) => {
    console.log('in the post route!')
    console.log(req.body);
    await dbClient.query(`INSERT INTO characters (name, rosternum) VALUES ($1, $2)`, [req.body.name, req.body.rosterNum]);
    res.send("Thanks!");
});

module.exports = router;