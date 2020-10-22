var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Disco = new Schema({
  id : { type: String  },
  titulo : { type: String  },
  grupo : { type: String  },
  year : { type: String  },
  genero : { type: String  }

});

var discos = mongoose.model('Discos', Disco);

module.exports = discos;
