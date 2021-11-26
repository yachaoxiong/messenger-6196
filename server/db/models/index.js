const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const Participant = require('./particpant');
// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
Conversation.belongsTo(User, { as: 'creator' });

User.hasMany(Participant);
User.hasMany(Message);
Message.belongsTo(Conversation);
Message.belongsTo(User, { as: 'sender' });

Conversation.hasMany(Message);
Participant.belongsTo(Conversation);
Participant.belongsTo(User, { as: 'user' });
Conversation.hasMany(Participant);

module.exports = {
  User,
  Conversation,
  Message,
  Participant,
};
