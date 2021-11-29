const db = require('../db');
const Sequelize = require('sequelize');

const Participant = db.define('participant', {
  role: {
    type: Sequelize.STRING,
    defaultValue: 'user',
  },
});

module.exports = Participant;
