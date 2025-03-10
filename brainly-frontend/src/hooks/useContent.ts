import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

export function useContent() {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setContents(res.data.content);
      } catch (error) {
        console.error('Client Error: Fetching content', error);
      }
    };

    fetchContent();
  }, []);

  return contents;
}
