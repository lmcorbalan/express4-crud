var app = module.parent.exports.app
  , Personas = require('../models/personas.js');

// console.log(app);

app.get( '/', function (req, res) {
    res.redirect('/listar')
})

app.get( '/listar', function (req, res) {
    Personas.find({}, function (err, docs) {
       res.render( 'lista', { title: 'Listado de Personas', personas: docs } );
    })
});

app.get( '/p/delete/:id', function (req, res) {
   Personas.remove({_id: req.params.id}, function (err, doc) {
       if (!err) res.redirect("/listar");
   })
});

app.get('/p/new', function (req, res) {
    res.render( 'new', { title: "Nueva Persona" })
});

app.post( '/p/new', function (req, res) {
    Personas.create( req.body, function (err, doc) {
        if (!err) {
          req.flash("info", "La persona se ha creado correctamente");
          res.redirect('/listar');
        }
    } )
});


