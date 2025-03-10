import { ReactElement } from 'react';

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className='flex p-2 gap-4 items-center text-gray-500 cursor-pointer hover:bg-gray-100 hover:rounded max-w-60 transition-all duration-200'>
      {icon}
      <span>{text}</span>
    </div>
  );
};

export default SidebarItem;
