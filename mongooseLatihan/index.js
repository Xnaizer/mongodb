// Koneksi ke MongoDB


const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie_db').then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));


// Membuat Schema dan Model

const movieSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    year: Number,
    score: Number,
    director: String,
});

// schema tipe data
// string
// number
// boolean
// date
// buffer
// array
// object
// mixed
// array
// map
// uuid

const Movie = mongoose.model('Movie', movieSchema);


// Menyimpan data ke database

// const newMovie = new Movie({
//     title: 'Inception',
//     year: 2010,
//     score: 8.8,
//     director: 'Christopher Nolan',
// });

// Movie.insertMany([
// {
//     title: 'The Dark Knight',
//     year: 2008,
//     score: 9.0,
//     director: 'Christopher Nolan',
// },
// {
//     title: 'Interstellar',
//     year: 2014,
//     score: 8.6,
//     director: 'Christopher Nolan',
// },
// {
//     title: 'Fight Club',
//     year: 1999,
//     score: 8.8,
//     director: 'David Fincher',
// },
// {
//     title: 'The Matrix',
//     year: 1999,
//     score: 8.7,
//     director: 'Lana Wachowski, Lilly Wachowski',
// },
// {
//     title: 'The Shawshank Redemption',
//     year: 1994,
//     score: 9.3,
//     director: 'Frank Darabont',
// },
// {
//     title: 'The Godfather',
//     year: 1972,
//     score: 9.2,
//     director: 'Francis Ford Coppola',
// },
// {
//     title: 'Pulp Fiction',
//     year: 1994,
//     score: 8.9,
//     director: 'Quentin Tarantino',
// },
// {
//     title: 'The Lord of the Rings: The Return of the King',
//     year: 2003,
//     score: 9.0,
//     director: 'Peter Jackson',
// },
// {
//     title: 'The Social Network',
//     year: 2010,
//     score: 7.7,
//     director: 'David Fincher',
// }
// ]).then(() => {
//     console.log('Data inserted successfully');
//     mongoose.connection.close(); // Tutup koneksi setelah selesai
//   })
//   .catch(err => console.log(err));



// // find movie diatas 2010

// Movie.find({ year: { $gt: 2009 }, score: { $gte: 7.7 } }).then(movies => {
//     console.log(movies);
// });



// update movie

// Movie.updateOne({ title: 'The Dark Knight' }, { score: 9.0 }).then(() => {
//     console.log('Data updated successfully');
//     mongoose.connection.close();
// })

// Movie.findByIdAndUpdate('67caab9e03c94f096759df46', { score: 9.0 }, { new: true }).then(() => {
//     console.log('Data updated successfully');
//     mongoose.connection.close();
// })



// delete movie
// Movie.deleteOne({ title: 'The Dark Knight' }).then(() => {
//     console.log('Data deleted successfully');
//     mongoose.connection.close(); 
// })