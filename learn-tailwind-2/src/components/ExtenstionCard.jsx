import React from 'react';
import Button from './Button';

const ExtenstionCard = ({ logo, typeOfExtension, versionNumber }) => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center py-4 px-8 shadow rounded-2xl'>
      {logo}
      <h3 className='font-bold'>{typeOfExtension}</h3>
      <p className='text-sm text-gray-300'>{versionNumber}</p>
      <Button variant={'primary'} text={'Add & Install Extension'} />
    </div>
  );
};

export default ExtenstionCard;
