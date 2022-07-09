const mongoose = require('mongoose') //mongoose 5.0.1;

mongoose.connect('mongodb://localhost/sandbox')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err))

const courseSchema= new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
        //match: /REGEX/
    },                                       //? Força a ter estas cenas todas
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean, 
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
}) // Criei um Schema

//Agora converte num model
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',       
        author: 'Eu a testar',
        tags: ['node', 'backend'],
        category:'web'
        isPublished: false,
        price: 20 
    })

    try {                               //? Tenta ver se dá sucesso
        const result = await course.save();
        console.log(result)
    }
    catch (ex) {                        //? Se der erro, vai dar log do erro
        console.log(ex.message)
    }
}

createCourse(); //Cria o novo document

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
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

//removeCourse('62c853fb5c70f0af9b97d65e');

createCourse()




// Custom Validator

const courseSchema2= new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
        //match: /REGEX/
    },        

    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },

    author: String,
    tags: {                                         
        type: Array,
        validate: {
            validator: function(v) {                        //? The custom validation
                return v.length > 0;
            },
            message: 'Course devia ter pelo menos uma tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean, 
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
})

// Async Custom Validator

const courseSchema3= new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
        //match: /REGEX/
    },        

    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
    },

    author: String,
    tags: {                                         
        type: Array,
        validate: {
            isAsync: true,                                //? Say it's async
            validator: function(v, callback) {            //? ADD callback    
                setTimeout(() => {
                    //!Fazer alguma porra assincrona
                    const result = v && v.length > 0;
                }, 4000)
                
                callback(result)
                
            },
            message: 'Course devia ter pelo menos uma tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean, 
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200
    }
})


//SCHEMATYPE OPTIONS

const courseSchema4= new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
        //match: /REGEX/
    },        

    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true                      //?Converte a string para lowercase
        //uppercase: true,                   //Converte a string para uppercase
        //trim: true                         //Tira os espaços no inicio e no fim
    },

    author: String,
    tags: {                                         
        type: Array,
        validate: {
            isAsync: true,                                 
            validator: function(v, callback) {              
                setTimeout(() => {
                    //Fazer alguma porra assincrona
                    const reusult = v && v.length > 0;
                }, 4000)
                
                callback(result)
                
            },
            message: 'Course devia ter pelo menos uma tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean, 
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),                         //? Arredonda o valor quando se lê o valor
        set: v => Math.round(v)                         //? Arredonda o valor quando se seta a o valor
    }
})

async function getCourses2() {
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({ _id: '62c8541dda0040cde6e5edde'})  //     
        .sort({ name: 1 }) // 1 É ordem ascendente, -1 é descendente
        .select({ name:1 , tags: 1, price:1 }) // Vai apenas mostrar estas keys
        //.count() -> conta quantos documentos dão match
    console.log(courses[0].price)  //?Vai arrendodar para baixo
}