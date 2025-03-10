import { useState } from 'react';
import { Button } from '../components/Button';
import Card from '../components/Card';
import CreateContentModal from '../components/CreateContentModal';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useAuth } from '../provider/AuthProvider';

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();
  const { contents, deleteContent, refetchContent, refresh } = useContent();

  const shareMyBrain = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/content/share`,
        { share: !user?.shareable },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data) {
        alert(`you can visit the link at ${res.data.link}`);
      }
    } catch (error) {
      console.error('Client Error: Sharing Brain', error);
    }
  };

  return (
    <div className='min-h-screen'>
      <Sidebar />
      <div className='ml-72 min-h-screen bg-background p-4'>
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onContentAdded={refetchContent}
        />
        <div className='flex justify-between items-center mb-5'>
          <div>
            <h3 className='text-text'>{user?.username}</h3>
          </div>
          <div className='flex gap-4'>
            <Button
              variant='primary'
              text='Add to Content'
              startIcon={<PlusIcon />}
              onClick={() => setModalOpen(true)}
            />
            <Button
              variant='secondary'
              text={`${user?.shareable ? 'Sharing' : 'Share Brain'}`}
              startIcon={<ShareIcon />}
              onClick={() => shareMyBrain()}
            />
          </div>
        </div>
        <div className='flex gap-4 flex-wrap' key={refresh}>
          {contents?.map(({ type, link, title, _id }) => (
            <Card
              title={title}
              type={type}
              link={link}
              key={_id}
              id={_id}
              onDelete={deleteContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
