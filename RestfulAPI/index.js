const express = require('express');
const app = express();

app.use(express.json());

const words = [
    {id: 1, word: 'Hello'},
    {id: 2, word: 'UNHAPPY'},
    {id: 3, word: 'WORLD'}
]
app.get('/', (req, res) => {
    res.send('Welcome to the game!');
});

app.get('/api/words', (req, res) => {
    res.send(words);
})

app.get('/api/words/:id', (req, res) => {
    const word1 = words.find( c => c.id === parseInt(req.params.id));
    if (!word1) res.status(404).send('There\'s no number with such id');
    else res.send(word1);
});

app.post('/api/words', (req, res) => {
    const word1 = {
        id: words.length +1, //Given by database, mas como não sei usar isso vai assim mm
        name: req.body.name
    }
    words.push(word1);
    res.send(word1);
});

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}...`);
})