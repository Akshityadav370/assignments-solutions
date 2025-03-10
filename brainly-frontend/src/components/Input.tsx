import { Ref } from 'react';

export function Input({
  placeHolder,
  type,
  reference,
  label,
}: {
  placeHolder: string;
  type: string;
  reference: Ref<HTMLInputElement>;
  label?: string;
}) {
  return (
    <div className='w-full'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          {label}
        </label>
      )}
      <input
        ref={reference}
        placeholder={placeHolder}
        type={type}
        className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      />
    </div>
  );
}
