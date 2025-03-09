const res = require('express/lib/response');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie_db').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));

const personSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,

});

personSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});

personSchema.pre('save', async function () {
    this.firstname = 'test';
    console.log('Saving person...');
    
});

personSchema.post('save', async function () {
    console.log('data berhasil disimpan');
    
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    firstname: 'John',
    lastname: 'Doe'
});



person.save().then((result) => console.log(result)).catch(err => console.log(err));