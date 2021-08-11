const express = require("express");
const app = express();

// Start middleware pipeline (HTTP request goes in).

app.use((req, res, next) => {
    console.log(req.url);
    next();
});

// 1st stop
app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello class!");
});

// 2nd stop
app.get("/best-cohort-ever", (req, res, next) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head><title>Best cohort ever!</title></head>
            <body>
                <h1>2108 Grace Hopper</h1>
                <script src="/colorizer.js"></script>
            </body>
        </html>
    `);
    next();
});

// 3rd stop
app.get("/colorizer.js", (req, res) => {
    res.sendFile(__dirname + "/fontbigger.js");
});

app.use((req, res) => {
    res.status(404).send("Not found sorry");
});

// End middleware pipeline.

const PORT = 8080;
app.listen(PORT, () => {
    console.log(
`
This process is now officially listening for HTTP messages!
It is listening for those signals on port ${PORT}. :)
Happy requesting!
`        
    );
});