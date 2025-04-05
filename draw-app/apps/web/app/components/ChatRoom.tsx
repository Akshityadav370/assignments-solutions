import axios from 'axios';
import { BACKEND_URL } from '../config';
import ChatRoomClient from './ChatRoomClient';

async function getMessages(id: string) {
  const res = await axios.get(`${BACKEND_URL}/room/${id}`);
  if (res.status !== 200) {
    return null;
  }
  return res.data.room.id;
}
export async function ChatRoom({ id }: { id: string }) {
  const messages = await getMessages(id);

  return <ChatRoomClient id={id} messages={messages} />;
}
