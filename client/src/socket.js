import io from 'socket.io-client';
import store from './store';
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
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
    const activeConversation = await store.getState().activeConversation;
    store.dispatch(
      setNewMessage(data.message, data.sender, activeConversation)
    );

    if (activeConversation) {
      const currentConvoId = await store
        .getState()
        .conversations.find((c) => c.otherUser.username === activeConversation);
      store.dispatch(setReadStatus(currentConvoId.id));
    }
  });
});

export default socket;
