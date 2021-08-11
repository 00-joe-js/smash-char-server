// This file is meant to be run on its own to reset all character info in the database.
// Don't run this willy-nilly, especially if you have new data beyond what is set by this file!

const pgClient = require("./client");
const rawCharacterData = require("./characters.json");

const runSeed = async () => {
    try {

        await pgClient.connect();

        await pgClient.query("DROP TABLE IF EXISTS characters;");

        await pgClient.query(`
            CREATE TABLE characters(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                rosterNum VARCHAR(10) NOT NULL
            );
        `);

        const preparedInsertSQL = `INSERT INTO characters (name, rosterNum) VALUES ($1, $2);`;

        const parallelInsertsForAllCharacters = rawCharacterData.map(async rawCharacter => {
            await pgClient.query(preparedInsertSQL, [rawCharacter.name, rawCharacter.id]);
        });

        // Wait for all INSERTs to complete by using Promise.all.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
        await Promise.all(parallelInsertsForAllCharacters);

        // Disconnect this client from Postgres so the Node process will turn off.
        await pgClient.end();
        console.log("Data seeded, turning off. Byeeeeeeeeeeee~");

    } catch (e) {
        console.log(e);
        process.kill();
    }
};
runSeed();