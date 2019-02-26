// Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


// Opens App Routes
module.exports = function(app) {


    var UserSchema = new Schema({
        usuario: { type: String, required: true },
        direccion: { type: String, required: true },
        fecha: { type: String, required: true },
        location: { type: [Number], required: true }, // [Long, Lat]
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });



    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query', function(req, res) {


        var lat = req.body.lat;
        var long = req.body.lon;
        var distance = req.body.distance;
        var fecha = req.body.fecha;

        //console.log(req.body);
        // Genero una colección por dia para la rapidez en la busqueda.


        UserSchema.index({ location: '2dsphere' });
        var base1 = fecha;
        console.log('Fecha:' + base1);

        // Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
        var Modelobase = mongoose.model(base1, UserSchema);




        // ...include filter by Max Distance (converting miles to meters)
        if (distance) {



            query = Modelobase.aggregate(
                [{
                    "$geoNear": {
                        "near": {
                            "type": "Point",
                            "coordinates": [long, lat]
                        },
                        "distanceField": "distancia",
                        "spherical": true,
                        "maxDistance": distance * 1000
                    }
                }],
                function(err, results) {

                }
            )







        }

        // ... Other queries will go here ...
        //console.log(Modelobase);
        // Execute Query and Return the Query Results
        query.exec(function(err, users) {
            if (err)
                res.send(err);


            //console.log(users);
            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(users);
        });
    });
};