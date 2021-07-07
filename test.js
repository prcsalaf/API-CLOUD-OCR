const querystring = require('querystring');

const data = querystring.parse( process.argv[2] || '' );

const x = data.pdf;

console.log(x);

app.listen(5000, "0.0.0.1", () => console.log("Server running"));