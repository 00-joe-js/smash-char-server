const express = require("express");
const app = express();

const characterRoutes = require("./smash-characters-router");

// Start middleware pipeline (HTTP request goes in).

app.use((req, res, next) => {
    // console.log(req.url);
    next();
});

app.use(express.json()); // Is this a post or put request? If it is, is the content JSON format? place parsed body on req.body
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello class!");
});

app.use("/characters", characterRoutes);
app.use("/smash", characterRoutes);
app.use("/chars", characterRoutes);

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