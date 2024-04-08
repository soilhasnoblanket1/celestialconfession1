const mongoose = require('mongoose');

const Confession = mongoose.model('Confession', {
  confession: {
    type: String,
    required: true
  },
  nickname: {
    type: String
  }
});

module.exports = Confession;