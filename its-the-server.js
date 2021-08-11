const express = require("express");
const app = express();

// Start middleware pipeline (HTTP request goes in).



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