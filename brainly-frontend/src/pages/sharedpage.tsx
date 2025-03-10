import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Card from '../components/Card';

function SharedPage() {
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { shareLink } = useParams();

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/content/share/${shareLink}`
        );

        if (response.data) {
          setContents(response.data.content);
          setUsername(response.data.username);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shared content:', error);
        setError('The shared link is invalid or has expired');
        setLoading(false);
      }
    };

    if (shareLink) {
      fetchSharedContent();
    }
  }, [shareLink]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-lg'>Loading shared content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='p-6 bg-red-50 rounded-lg'>
          <h2 className='text-xl text-red-700 mb-2'>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-2xl font-bold mb-2'>Shared Content</h1>
          <p className='text-lg'>
            Viewing content shared by:{' '}
            <span className='font-medium'>{username}</span>
          </p>
        </div>

        <div className='flex gap-4 flex-wrap'>
          {contents.length > 0 ? (
            contents.map(({ type, link, title, _id }) => (
              <Card
                title={title}
                type={type}
                link={link}
                key={_id}
                id={_id}
                readOnly={true}
              />
            ))
          ) : (
            <p>No content has been shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SharedPage;
