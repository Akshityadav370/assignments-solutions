'use client';

import { BACKEND_URL } from '@repo/common/types';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import ChatRoom from '../../../components/ChatRoom';

export default function Room({ params }: { params: { slug: string } }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        // Get or create room
        let roomIdResult;
        try {
          const roomRes = await axios.get(`${BACKEND_URL}/room/${slug}`, {
            withCredentials: true,
          });
          roomIdResult = roomRes.data.room?.id;
        } catch (error) {
          // Create new room if not found
          const newRoomRes = await axios.post(
            `${BACKEND_URL}/room/create`,
            { name: slug },
            { withCredentials: true }
          );
          roomIdResult = newRoomRes.data.roomId;
        }

        setRoomId(roomIdResult);

        // Get messages
        if (roomIdResult) {
          const messagesRes = await axios.get(
            `${BACKEND_URL}/room/chat/${roomIdResult}`,
            {
              withCredentials: true,
            }
          );
          setMessages(messagesRes.data.messages);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error || !roomId || !messages)
    return <div>Internal Error, working on it!</div>;

  return <ChatRoom roomId={roomId} messages={messages} />;
}
