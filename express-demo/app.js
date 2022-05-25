const express = require('express');
const app = express();
const test = require("./dica.js");
const path = require("path");
const pastObj = path.parse(__filename);
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");
const http = require("http");
const { runInNewContext } = require('vm');


const server = http.createServer( (req, res) => {
    if (req.url === '/') {
        res.write('HELLO MIG');
        res.end();
    }

    if (req.url === '/api/coisita') {
        res.write(JSON.stringify([1,2,3,4,5,6,7,8,9,10,11]));
        res.end();
    }
});


server.listen(3000);

console.log("Listening on port 3000...");










/*

const emitter = new EventEmitter();

//Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called');
})

//Raise an event
emitter.emit('messageLogged',{id:1,  url: 'http://fds.pt'}); //raises an emition -> sings that an event occurred

//Raise: logging (data: message)
*/




/*
fs.readdir("$", function(err, file) {
    if (err) console.log('ERROR ' + err);
    else console.log('Result', file)
});
*/



/*
const totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log("Total memory: " + totalMemory);
console.log("Free memory: " + freeMemory);
*/


//console.log(pastObj);



/*
test();

console.log(test);
*/



/*
app.get("/", (req, res) => {    //
    res.send("Hello world!");
});

app.get("/api/array", (req, res) => {
    res.send(["SANTA", "DEUSA", "HUINA"]);
})

app.get("/api/nivelfelicidade/:id", (req, res) => {
    res.send(req.params.id);
})

app.get("/api/aniversario/:mes/:dia", (req, res) => {
    res.send(req.query);
})

const port = process.env.PORT || 8000; //tries to get an available port, if it can't just uses port 8000
app.listen(port, () => console.log(`Porta: ${port}`))
*/