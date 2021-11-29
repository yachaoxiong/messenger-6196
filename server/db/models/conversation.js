const { Sequelize, Op } = require('sequelize');
const { Participant } = require('.');
const db = require('../db');
const Message = require('./message');

const Conversation = db.define('conversation', {
  mode: {
    type: Sequelize.STRING,
    defaultValue: 'private',
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (useId) {
  const conversation = await Conversation.findOne({
    include: [
      {
        model: Participant,
        where: { useId: { [Op.eq]: useId } },
      },
    ],
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
