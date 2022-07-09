const mongoose = require('mongoose') //mongoose 5.0.1;

mongoose.connect('mongodb://localhost/sandbox')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err))

const courseSchema= new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean 
}) // Criei um Schema

//Agora converte num model
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Eu a testar',
        tags: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result)
}

createCourse();