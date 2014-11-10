var utils = require('../utils');
var dbConex = exports.dbConex = utils.dbConnection("localhost","personas-test","","");
var Persona = require('../models/personas.js');

var p = new Persona({nombre: "pepe", age: 13});
p.save(function (err, doc) {
    console.log(err, doc)
});

