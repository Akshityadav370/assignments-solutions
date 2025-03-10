import { useState } from 'react';
import { Button } from '../components/Button';
import Card from '../components/Card';
import CreateContentModal from '../components/CreateContentModal';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div className='min-h-screen'>
      <Sidebar />
      <div className='ml-72 min-h-screen bg-background p-4'>
        <CreateContentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
        <div className='flex justify-end gap-4 items-center'>
          <Button
            variant='primary'
            text='Add to Content'
            startIcon={<PlusIcon />}
            onClick={() => setModalOpen(true)}
          />
          <Button
            variant='secondary'
            text='Share Brain'
            startIcon={<ShareIcon />}
          />
        </div>
        <div className='flex gap-4 flex-wrap'>
          {contents?.map(({ type, link, title, _id }) => (
            <Card title={title} type={type} link={link} key={_id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
