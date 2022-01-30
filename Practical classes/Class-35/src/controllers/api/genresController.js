const { json } = require("express/lib/response");
const db = require("../../database/models");

const Genres = db.Genre;


const genresController = {
    list:(req,res) => {
        
        Genres.findAll().then(genres => {
            
            const response = {
                meta: {
                    status: 200,
                    total:genres.length,
                    url: "api/genres"
                },
                data: genres,
            }
            res.json(response);



        })


       
    },
    detail:(req,res)=> {
        const {id} = req.params;
        Genres.findByPk(id, {
            include: ["movies"],
        }).then((genre) => {
            let respuesta = {
                meta: {
                    status: 200,
                    url: "api/genres"
                },
                data: genre,
            };
            res.json(respuesta);

        },
        )

    }
}

module.exports = genresController;