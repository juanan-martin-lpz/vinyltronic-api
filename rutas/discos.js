const express = require('express');
const router = express.Router();

let Disco = require('../modelos/disco.js');


router.get('/discos', (req, res) => {

  Disco.find({})
    .exec()
    .then( discos => {
      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        discos: discos
      });
    })
    .catch( err => {
        res.json({ message: err });
    });
});

router.get('/discos/:id', (req, res) => {

  let id = req.params.id;

  Disco.findById(id)
    .then( disco => {
      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        disco: disco
      });
    })
    .catch( err => {
        res.json({ message: err });

    });
});


router.get('/discos/grupo/:filtro', (req, res) => {

  let filtro = req.params.filtro;

  Disco.find({ 'grupo': filtro})
    .exec()
    .then( discos => {
      res.status(200).json({
        status: true,
        message: 'Consulta Discos OK',
        discos: discos
      });
    })
    .catch( err => {
        res.json({ message: err });
    });

});

router.post('/discos', (req, res) => {

  let body = req.body;

  let disco = new Disco();

  disco.id = uuidv4();
  disco.titulo = body.titulo;
  disco.grupo = body.grupo;
  disco.year = body.year;
  disco.genero = body.genero;


  disco.save()
    .then( d => {
      res.json({status: true,  message: 'Disco creado con exito', disco: d });
    })
    .catch( err => {
      return res.status(500).json({
        status: false,
        message: 'Error al crear Disco',
        errors: err
      });
    });
});


router.put('/discos/:id', (req, res) => {

  var id = req.params.id;

  var body = req.body;


  Disco.findOneAndUpdate(id, body)
    .then( disco => {
      res.json({status: true,  message: 'Disco modificado con exito', disco: disco });
    })
    .catch( err => {
      return res.status(500).json({
        status: false,
        message: 'Error al modificar Disco',
        errors: err
      });
    });
});

router.delete('/discos/:id', (req, res) => {

  var id = req.params.id;

  Disco.findByIdAndDelete(id)
    .then( disco => {
      res.json({
        status: true,
        message: 'Disco borrado correctamente',
        disco: disco });
    })
    .catch( err => {
      return res.status(500).json({
        status: false,
        message: 'Error al borrar el disco',
        errors: err
      });
    });
});


module.exports = router;
