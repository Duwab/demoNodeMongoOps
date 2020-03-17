const mongoose = require('mongoose');

function buildModel(connection) {
  const Schema = mongoose.Schema;

  const ItemSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

  return connection.model('item', ItemSchema);
}


module.exports = buildModel;
