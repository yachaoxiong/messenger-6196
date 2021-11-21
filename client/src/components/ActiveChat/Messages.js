import React from 'react';
import { Box, Avatar } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '../ActiveChat';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  readStatusAvatar: {
    width: '20px',
    height: '20px',
  },
}));
const Messages = (props) => {
  const classes = useStyles();
  const { messages, otherUser, userId, lastReadMessage } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        if (message.senderId === userId) {
          return lastReadMessage && message.id === lastReadMessage.id ? (
            <Box key={message.id} className={classes.root}>
              <SenderBubble text={message.text} time={time} />
              <Avatar
                alt={otherUser.username}
                className={classes.readStatusAvatar}
                src={otherUser.photoUrl}
              />
            </Box>
          ) : (
            <SenderBubble key={message.id} text={message.text} time={time} />
          );
        } else {
          return (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        }
      })}
    </Box>
  );
};

export default Messages;
