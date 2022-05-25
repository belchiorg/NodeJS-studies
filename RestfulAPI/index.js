const Joi = require('joi'); //Joi 13.1.0
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
    if (!word1) return res.status(404).send('There\'s no number with such id');
    else res.send(word1);
});





function validateWord(word) {
    const schema = {
        word: Joi.string().min(3).required(),                               
    };

    return Joi.validate(word, schema);
}



app.post('/api/words', (req, res) => {

    const {error} = validateWord(req.body);

    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const word1 = {
        id: words.length +1, //Given by database, mas como não sei usar isso vai assim mm (id = tamanho+1)
        word: req.body.word  //Verificar com POSTMAN
    }
    words.push(word1);      //Adiciona a palavra à array
    res.send(word1);
});


app.put('/api/words/:id', (req, res) =>  {
    //Searchs the word
    const word1 = words.find( c => c.id === parseInt(req.params.id));  
    
    //If it does not exist, return 404 error     
    if (!word1) return res.status(404).send('There\'s no number with such id');   

    //Validate
    const {error}  = validateWord(req.body);
    //If invalid return 400 - Bad request
    if (error) {
        res.status(400).send(error.details[0].message)               
        return;
    }

    //Update words
    word1.word = req.body.word;
    res.send(word1);
    //Return the updated words
});

app.delete('/api/words/:id', (req, res) => {
    //Look up the code
    //Not existing, return 404
    const word1 = words.find( c => c.id === parseInt(req.params.id));
    if (!word1) return res.status(404).send('There\'s no number with such id');

    //delete
    const index = words.indexOf(word1);
    words.splice(index, 1);
    //Return the same word
    res.send(word1);
})

const port = process.env.PORT || 3000;

app.listen(port, (req, res) => {
    console.log(`listening on port ${port}...`);
})