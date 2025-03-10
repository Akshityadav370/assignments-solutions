import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';
import SidebarItem from './SidebarItem';
import Logo from '../assets/icons8-brain.gif';
import { LogoutIcon } from '../icons/LogoutIcon';
import { useAuth } from '../provider/AuthProvider';

export const Sidebar = () => {
  const { logOut } = useAuth();
  return (
    <div className='h-screen bg-white border-r w-72 fixed inset-0 border-accent pl-2'>
      <div className='p-2 pt-4 flex gap-4 items-center text-gray-800 font-bold justify-between'>
        <div className='flex items-center gap-4'>
          <img src={Logo} height={35} width={35} />
          Brainly
        </div>
        <div onClick={logOut}>
          <LogoutIcon />
        </div>
      </div>
      <div className='pt-6 ml-2'>
        <SidebarItem text='Twitter' icon={<TwitterIcon />} />
        <SidebarItem text='Youtube' icon={<YoutubeIcon />} />
      </div>
    </div>
  );
};
