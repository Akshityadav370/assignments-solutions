import { useRef, useState } from 'react';
import CloseIcon from '../icons/CloseIcon';
import { Button } from './Button';
import { Input } from './Input';
import { BACKEND_URL } from '../config';
import axios from 'axios';

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onContentAdded: () => void;
}

enum ContentType {
  YouTube = 'youtube',
  Twitter = 'twitter',
}

// TODO:
// Figure out ways to close when clicking outside of the modal content area!

const CreateContentModal = ({
  open,
  onClose,
  onContentAdded,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.YouTube);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    onClose();
    onContentAdded();
  };

  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50`}>
      <div className='fixed inset-0 bg-slate-400 opacity-50'></div>

      <div className='fixed inset-0 flex items-center justify-center z-10'>
        <div className='bg-white p-4 rounded-2xl z-20 relative'>
          <div
            className='flex justify-end cursor-pointer pt-5 px-5'
            onClick={onClose}
          >
            <CloseIcon />
          </div>
          <div className='flex flex-col gap-6 m-8'>
            <Input reference={titleRef} placeHolder='Title' type='text' />
            <Input reference={linkRef} placeHolder='Link' type='text' />
            <div className='w-full'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Content Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
                className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
              >
                <option value={ContentType.YouTube}>YouTube</option>
                <option value={ContentType.Twitter}>Twitter</option>
              </select>
            </div>
            <div className='flex justify-center mt-4'>
              <Button onClick={addContent} variant='primary' text='Submit' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContentModal;
