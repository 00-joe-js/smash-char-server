const pg = require("pg");

module.exports = new pg.Client({
    database: "smashbros",
    // remove or replace with your own credentials as necessary
    user: "joe-alves",
    password: "buttons"
});

