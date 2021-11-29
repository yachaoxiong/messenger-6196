const Conversation = require('./conversation');
const User = require('./user');
const Message = require('./message');
const Participant = require('./particpant');

// associations
User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });

Participant.belongsTo(Conversation);
Conversation.hasMany(Participant);

Participant.belongsToMany(User, { through: 'UserParticipant' });
User.belongsToMany(Participant, { through: 'UserParticipant' });

Message.belongsToMany(User, { through: 'UserMessage' });
User.belongsToMany(Message, { through: 'UserMessage' });

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message,
  Participant,
};

// [
//   {
//     id: 1,
//     mode: 'private',
//     otherUser: {},
//     participants: [{}, {}],
//     messages: [{}, {}],
//     lastReadMessage: 'hello',
//     numberOfUnreadMessages: 2,
//   },
//   {
//     id: '2',
//     name: 'hatchway group',
//     mode: 'group',
//     participants: [{}, {}],
//     messages: [{}, {}],
//     lastMessages: 'hi',
//   },
// ];
