import io from 'socket.io-client';
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setcurrentMessaageStatus,
} from './store/conversations';
import { setReadStatus } from '../src/store/utils/thunkCreators';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('connected to server');

  socket.on('add-online-user', (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on('remove-offline-user', (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on('new-message', async (data) => {
    const { activeConversation, conversations } = store.getState();
    store.dispatch(
      setNewMessage(data.message, data.sender, activeConversation)
    );

    if (activeConversation) {
      const currentConvo = await conversations.find(
        (c) => c.otherUser.username === activeConversation
      );
      if (currentConvo.id === data.message.conversationId) {
        store.dispatch(setReadStatus(data.message));
      }
    }
  });

  socket.on('read-message', async (message) => {
    store.dispatch(setcurrentMessaageStatus(message));
  });
});

export default socket;
