import React from 'react';
import { Box, Badge } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { setActiveChat } from '../../store/activeConversation';
import { setReadStatus } from '../../store/utils/thunkCreators';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  messageBadge: {
    position: 'absolute',
    top: '45%',
    right: '10%',
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    if (conversation.numberOfUnreadMessages > 0) {
      const readMessages = conversation.messages
        .filter((m) => {
          if (m.senderId === otherUser.id && !m.isRead) {
            return true;
          }
          return false;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      await props.setReadStatus(readMessages[0]);
    }

    await props.setActiveChat(conversation.otherUser.username);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {!!conversation.numberOfUnreadMessages && (
        <Badge
          className={classes.messageBadge}
          badgeContent={conversation.numberOfUnreadMessages}
          color='primary'
        />
      )}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReadStatus: (message) => {
      dispatch(setReadStatus(message));
    },
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
