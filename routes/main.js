var app = module.parent.exports.app
  , Personas = require( '../models/personas.js' );

app.get( '/', function (req, res) {
    res.redirect( '/listar' )
})

// Listar
app.get( '/listar', function (req, res) {
    Personas.find({}, function (err, docs) {
       res.render( 'lista', { title: 'Listado de Personas', personas: docs } );
    })
});

// Crear
app.get('/p/new', function (req, res) {
    res.render( 'new', { title: "Nueva Persona" } )
});

app.post( '/p/new', function (req, res) {
    Personas.create( req.body, function (err, doc) {
        if ( !err ) {
            req.flash( "info", "La persona se ha creado correctamente" );
            res.redirect( '/listar' );
        } else {
            res.end( err );
        }
    } )
});


// Editar
app.get( '/p/edit/:id', function (req, res) {
    Personas.findOne({ _id: req.params.id }, function (err, doc) {
        if ( !err ) {
            res.render('edit', { title: 'Editar Persona', persona: doc});
        } else {
            res.end( err );
        }
    });
});

app.post('/p/edit/:id', function (req, res) {
    Personas.findOne({ _id: req.params.id }, function (err, doc) {
        if ( !err ) {
            doc.nombre = req.body.nombre;
            doc.age    = req.body.age;
            doc.save( function (err, doc) {
                if ( !err ) {
                    req.flash( "info", "La persona se ha modificado correctamente" );
                    res.redirect( '/listar' );
                } else {
                    res.end( err );
                }
            });
        } else {
            res.end(err);
        }
    });
});

// Borrar
app.get( '/p/delete/:id', function (req, res) {
   Personas.remove({_id: req.params.id}, function (err, doc) {
      if ( !err ) {
          req.flash( "info", "La persona se ha eliminado correctamente" );
          res.redirect( "/listar" );
      } else {
          res.end( err );
      }
   })
});
