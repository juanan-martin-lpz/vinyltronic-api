const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

let Disco = require('../modelos/disco.js');


app.get('/discos', (req, res) => {

  Disco.find({})
    .exec(function(err, docs) {

      if (err) {
        res.json({ message: err });
      }

      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        discos: docs
      });
    });
});

app.get('/discos/:id', (req, res) => {

  let id = req.params.id;

  Disco.find({'id': id })
    .exec( (err, disco) => {

      if (err) {
        res.json({ message: err });
      }

      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        disco: disco
      });
    });

});


app.get('/discos/grupo/:filtro', (req, res) => {

  let filtro = req.params.filtro;

  Disco.find({ 'grupo': filtro})
    .exec(function(err, docs) {

      if (err) {
        res.json({ message: err });
      }

      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        discos: docs
      });
    });

});

app.post('/discos', (req, res) => {

  let body = req.body;

  let disco = new Disco();

  disco.id = uuidv4();
  disco.titulo = body.titulo;
  disco.grupo = body.grupo;
  disco.year = body.year;
  disco.genero = body.genero;

  disco.save(disco, (err, d) => {

    if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al crear Disco',
          errors: err
        });
    }


    res.json({status: true,  message: 'Disco creado con exito', disco: d });

    });
});

app.put('/discos/:id', (req, res) => {

  var id = req.params.id;

  Disco.findById(id, (err, disco) => {

    var body = req.body;

    disco.titulo = body.titulo;
    disco.grupo = body.grupo;
    disco.year = body.year;
    disco.genero = body.genero;

    disco.save(disco, (err, d) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Error al modificar Disco',
          errors: err
        });
      }

      res.json({status: true,  message: 'Disco modificado con exito', disco: d });
    });
  });

});

app.delete('/discos/:id', (req, res) => {

  var id = req.params.id;

  Disco.findByIdAndDelete(id, (err, disco) => {

    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Error al borrar el disco',
        errors: err
      });
    }

    res.json({
      status: true,
      message: 'Disco borrado correctamente',
      disco: disco });
  });


});


module.exports = app;
