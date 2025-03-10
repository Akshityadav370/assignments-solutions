import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { BACKEND_URL } from '../config';

export function useContent() {
  const [contents, setContents] = useState([]);
  const [refresh, setRefresh] = useState(0); // Add a refresh counter state

  const fetchContent = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data) {
        setContents(res.data.content);
      }
    } catch (error) {
      console.error('Client Error: Fetching content', error);
    }
  }, []);

  const refetchContent = useCallback(() => {
    setRefresh((prev) => prev + 1);
  }, []);

  const deleteContent = useCallback(
    async (contentId: string) => {
      try {
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
          data: { contentId: contentId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        refetchContent();
      } catch (error) {
        console.error('Client Error: Deleting content', error);
        return 'error';
      }
    },
    [refetchContent]
  );

  useEffect(() => {
    fetchContent();
  }, [refresh, fetchContent]);

  return { contents, deleteContent, refetchContent, refresh };
}
