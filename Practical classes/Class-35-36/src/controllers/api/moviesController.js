const db = require("../../database/models");
const { json } = require("express/lib/response");
const fetch = require('node-fetch');
const Movies = db.Movie;

const movieApiController = {
    create: (req,res) => {
        console.log("body")
        console.log(req.body.title);
        console.log(req.body.rating);
        console.log(req.body.awards);
        console.log(req.body.release_date);
        console.log(req.body.length);

        Movies.create(
            {   

                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id:req.body.genre_id,
            }
        )
            .then((confirm)=>{
                let respuesta
                if(confirm){
                    respuesta = {
                        meta: {
                            status: 200,
                            
                            url: "api/genres"
                        },
                        data:confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 200,
                            
                            url: "api/genres"
                        },
                        data:"X"
                    }

                }
                res.json(respuesta)
                




            }

            )
            .catch((err)=> res.send(err));

    },
    search: (req,res)=>{
        let searchMovie = req.body.titulo;
        let stringReplace = searchMovie.split("").join("+")
        const apikey = "";

        const url = "http://www.omdbapi.com/?apikey=${apiKey}&t=${stringReplace}";

        fetch(url)
        .then((response)=> response.json())
        .then((movie)=> {
            return res.render('moviesDetailOmdb', {movie});
        });
        
    }
};

module.exports = movieApiController;