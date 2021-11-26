const { Sequelize, Op } = require('sequelize');
const db = require('../db');
const Message = require('./message');

const Conversation = db.define('conversation', {
  mode: {
    type: Sequelize.STRING,
    defaultValue: 'private',
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      mode: 'private',
      user1Id: {
        [Op.or]: [user1Id, user2Id],
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id],
      },
    },
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

module.exports = Conversation;
