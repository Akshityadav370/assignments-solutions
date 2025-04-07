import { ChatRoom } from '../../components/ChatRoom';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

async function getRoomId(slug: string) {
  const res = await axios.get(`${BACKEND_URL}/room/${slug}`, {
    headers: {
      Authorization: '',
    },
  });
  if (res.status !== 200) {
    return null;
  }
  return res.data.room.id;
}

export default async function Room({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const roomId = await getRoomId(slug);

  return <ChatRoom id={roomId} />;
}
