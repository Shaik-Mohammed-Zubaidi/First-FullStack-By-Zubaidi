const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/imdb').then(() => console.log("Connected to MongoDB")).catch((err) => console.log("Exception Occured ", err));

const movieSchema= new mongoose.Schema({
    name: String,
    description: String,
    boxOfficeCollection:Number,
    budget:Number,
    isHit:Boolean,
    actors:[String],
    releaseDate: Date
});

const Movie= mongoose.model('Movie',movieSchema);

app.get('/api/v1/movies', (req, res) => {
    // Movie.find().limit(2).sort({name:-1}).select({name:1, description:1, releaseDate:1}).then((movies)=> res.send(movies));
    Movie.find().then((movies)=> res.send(movies));
    // res.send("Connected bro....");
});

// app.get('/api/v1/movies/:id', (req, res) => {
//     const id = req.params.id;
//
//     Movie.findById(id).then((movie)=>{
//         if (!movie) {
//             res.status(404).send(`movie with id ${id} was not found`);
//             return;
//         }
//         res.send(movie)
//     });
// });

app.get('/api/v1/movies/:name', (req, res) => {
    const mname = req.params.name;

    Movie.find({name: {$in: [new RegExp(mname,"i")]}}).then((movie)=>{
        res.send(movie);
    }).catch(()=> res.status(404).send({error: "movie with that name not found"}));
});

app.post('/api/v1/movies', (req, res) => {

    const movie= new Movie({...req.body});

    movie.save().then((movie)=> res.send(movie));
})

app.put('/api/v1/movies/:id',(req,res)=>{
    const id= req.params.id;
    const receivedMovie= req.body;
    Movie.findByIdAndUpdate(id,receivedMovie).then((movie)=>{
        movie= {...receivedMovie};
        res.send(`movie is updated as ${movie}`);
    }).catch(()=>{
        const newMovie= new Movie({...receivedMovie});
        (newMovie).save().then(()=> res.send("new Movie was added as it didnt exist"));
    });
});

app.patch('/api/v1/movies/:id',(req,res)=>{
    const id= req.params.id;
    const receivedMovie= req.body;
    Movie.findByIdAndUpdate(id,receivedMovie).then((movie)=>{
        movie.name= receivedMovie.name;
        res.send(`movie is updated as ${movie}`);
    }).catch(()=>{
        res.status(404).send(`movie with ${id} was not found`);
    });
});

app.delete('/api/v1/movies/:id',(req,res)=>{
    const id= req.params.id;
    Movie.findByIdAndDelete(id).then((movie)=>{
        res.send(`Deleted movie was ${movie}`);
    }).catch(()=>{
        res.status(404).send(`movie with id ${id} was not found`);
    });
});

app.listen(5000, () => console.log("Listening......"));