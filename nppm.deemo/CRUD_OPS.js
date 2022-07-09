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
        author: 'Eu a gay testar',
        tags: ['node', 'backend'],
        isPublished: true
    })

    const result = await course.save();
    console.log(result)
}

//createCourse(); //Cria o novo document

async function getCourses() {
    // eq (equal)
    // new (not equal)
    // gt (greater than)
    // gte (greater or equal)
    // lt (less)
    // lte (less or equal)
    // in
    // nin (not in)


    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        //.find({ name: 'Node.js Course', isPublished: true } /*"filtra essa porra"*/)
        //.find({ price: { $gte: 10, $lt: 35}}) //Escolhe os preços entre 10 e 35
        //.find({ price: { $in : [10, 15, 20]}})  // Apenas picka aqueles ali na array (preguiça de escrever bem xd)

        //.or([ {author: 'Eu a gay testar'}, {isPublished: true}]) //TEM O OR, AND

        .find({ author: /^Eu.*/i })     //As famosas regex que o gui nao gosta
        .find({ author: /.*testar$/i})
        .skip((pageNumber -1) * pageSize) //Faço a menor ideia
        .limit(pageSize)
        .sort({ name: 1 }) // 1 É ordem ascendente, -1 é descendente
        .select({ name:1 , tags: 1 }) // Vai apenas mostrar estas keys
        //.count() -> conta quantos documentos dão match
    console.log(courses)
}

//getCourses();


//Updating a course



/*    //Quering first

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    course.isPublished = true
    course.author = 'Another Author'

    const result = await course.save();
    console.log(result);
}
*/


// Update first
async function updateCourse(id) {
    //const result = await Course.update({ _id: id}, {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Belchior',
            isPublished: true
        }
    }, {new: true}); // muda o result para o novo document 

    console.log(result);
}


// updateCourse('62c853fb5c70f0af9b97d65e');


async function removeCourse(id) {
    //const result = await Course.update({ _id: id}, {
    const result = await Course.findByIdAndRemove(id)

    console.log(result);
}

removeCourse('62c853fb5c70f0af9b97d65e');