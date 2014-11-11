var mongoose = require( 'mongoose' )
  , Schema   = mongoose.Schema;

var personaSchema = new Schema({
  nombre: String,
  age   : Number
});

/**
* Personas.create(data, function(){}):
*/
personaSchema.static.create = function (data, cb) {
  var Personas = this; // Esto se hace siempre que se haga un metodo estatico para fijar el scope

  var p = new Personas({
    nombre: data.nombre,
       age: data.age
  });

  p.save( cb );
}

var personaModel = mongoose.model( "Personas", personaSchema );
module.exports   = personaModel;
