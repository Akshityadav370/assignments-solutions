export const ColorTest = () => {
  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-xl font-bold'>Color Test</h2>

      <div className='p-4 bg-primary text-white rounded'>
        Primary Color (#b15688)
      </div>

      <div className='p-4 bg-secondary text-text rounded'>
        Secondary Color (#d8a4c1)
      </div>

      <div className='p-4 bg-accent text-white rounded'>
        Accent Color (#c976a3)
      </div>

      {/* Test native Tailwind colors to see if Tailwind itself is working */}
      <div className='p-4 bg-blue-500 text-white rounded'>
        Standard Tailwind Blue
      </div>
    </div>
  );
};
