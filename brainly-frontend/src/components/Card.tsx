import ShareIcon from '../icons/ShareIcon';
import TrashIcon from '../icons/TrashIcon';
import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

interface CardProps {
  title: string;
  link: string;
  type: 'twitter' | 'youtube';
  id: string;
  onDelete?: (id: string) => Promise<any>;
  readOnly?: boolean;
}

const Card = ({
  title,
  link,
  type,
  id,
  onDelete,
  readOnly = false,
}: CardProps) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      await onDelete(id);
    }
  };

  return (
    <div>
      <div className='p-4 bg-white rounded-lg border-gray-200 max-w-72 border min-h-48 min-w-72'>
        <div className='flex justify-between'>
          <div className='flex items-center text-md'>
            <div className='text-gray-500 pr-2'>
              {type === 'twitter' && <TwitterIcon />}
              {type === 'youtube' && <YoutubeIcon />}
            </div>
            {title}
          </div>
          <div className='flex items-center'>
            <div className='pr-2 text-gray-500'>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <ShareIcon />
              </a>
            </div>
            {!readOnly && (
              <div
                className='text-gray-500 cursor-pointer'
                onClick={handleDelete}
              >
                <TrashIcon />
              </div>
            )}
          </div>
        </div>
        <div className='pt-4'>
          {type === 'youtube' && (
            <iframe
              className='w-full'
              src={link.replace('watch', 'embed').replace('?v=', '/')}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerPolicy='strict-origin-when-cross-origin'
              allowFullScreen
            ></iframe>
          )}
          {type === 'twitter' && (
            <blockquote className='twitter-tweet'>
              <a href={link.replace('x.com', 'twitter.com')}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
