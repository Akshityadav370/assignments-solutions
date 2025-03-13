import React, { useState } from 'react';
import HeaderHero from '../assets/illustration-hero.svg';
import SimpleFeature from '../assets/illustration-features-tab-1.svg';
import SpeedyFeature from '../assets/illustration-features-tab-2.svg';
import EasyFeature from '../assets/illustration-features-tab-3.svg';
import Button from '../components/Button';
import FAQItem from '../components/FAQItem';
import Chrome from '../assets/logo-chrome.svg';
import Firefox from '../assets/logo-firefox.svg';
import Opera from '../assets/logo-opera.svg';
import { useMemo } from 'react';
import ExtenstionCard from '../components/ExtenstionCard';
import Newsletter from '../components/NewsLetter';

const Home = () => {
  const [selectedFeature, setSelectedFeature] = useState('simple');

  // FAQ data
  const faqData = [
    {
      question: 'What is Bookmark?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tincidunt justo eget ultricies fringilla. Phasellus blandit ipsum quis quam ornare mattis.',
    },
    {
      question: 'How can I request a new browser?',
      answer:
        'Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet. Vivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdie tVivamus luctus eros aliquet convallis ultricies. Mauris augue massa, ultricies non ligula. Suspendisse imperdiet.',
    },
    {
      question: 'Is there a mobile app?',
      answer:
        'Sed consectetur quam id neque fermentum accumsan. Praesent luctus vestibulum dolor, ut condimentum urna vulputate eget. Cras in ligula quis est pharetra mattis sit amet pharetra purus. Sed sollicitudin ex et ultricies bibendum.',
    },
    {
      question: 'What about other Chromium browsers?',
      answer:
        'Integer condimentum ipsum id imperdiet finibus. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit. Vivamus in placerat mi, at euismod dui. Aliquam vitae neque eget nisl gravida pellentesque non ut velit.',
    },
  ];

  const renderFeatureContent = useMemo(() => {
    if (selectedFeature === 'simple') {
      return (
        <>
          <div className='flex flex-1 relative'>
            <img
              src={SimpleFeature}
              alt='Tablet'
              className='z-10 ml-28 scale-85 mb-10'
            />
            <div className='h-[70%] w-[80%] bg-main absolute bottom-0 left-0 rounded-br-full rounded-tr-full'></div>
          </div>
          <div className='flex flex-1 flex-col gap-8'>
            <h3 className='text-3xl font-bold'>Bookmark in one click</h3>
            <p className='max-w-[50%] text-sm text-gray-400'>
              Our aim is to make it quick and easy for you to access your
              favourite websites. Your bookmarks sync between your devices so
              you can access them on the go.
            </p>
            <Button variant={'primary'} text={'More Info'} />
          </div>
        </>
      );
    } else if (selectedFeature === 'speedy') {
      return (
        <>
          <div className='flex flex-1 relative'>
            <img
              src={SpeedyFeature}
              alt='Tablet'
              className='z-10 scale-85 ml-36'
            />
            <div className='h-[70%] w-[80%] bg-main absolute bottom-0 left-0 rounded-br-full rounded-tr-full'></div>
          </div>
          <div className='flex flex-1 flex-col gap-8'>
            <h3 className='text-3xl font-bold'>Intelligent Search</h3>
            <p className='max-w-[50%] text-sm text-gray-400'>
              Our powerful search feature will help you find saved sites in no
              time at all. No need to trawl through all of your bookmarks.
            </p>
            <Button variant={'primary'} text={'More Info'} />
          </div>
        </>
      );
    }
    return (
      <>
        <div className='flex flex-1 relative'>
          <img src={EasyFeature} alt='Tablet' className='z-10 scale-90 ml-44' />
          <div className='h-[70%] w-[80%] bg-main absolute bottom-0 left-0 rounded-br-full rounded-tr-full'></div>
        </div>
        <div className='flex flex-1 flex-col gap-8'>
          <h3 className='text-3xl font-bold'>Share your bookmarks</h3>
          <p className='max-w-[50%] text-sm text-gray-400'>
            Easily share your bookmarks and collections with others. Create a
            shareable a link that you can send at the click of a button.
          </p>
          <Button variant={'primary'} text={'More Info'} />
        </div>
      </>
    );
  }, [selectedFeature]);

  return (
    <div className=''>
      {/* Hero Section Start */}
      <div className='flex justify-between items-center p-5 pr-0 gap-15'>
        <div className='flex flex-1 flex-col gap-10'>
          <h1 className='text-6xl font-bold'>A Simple Bookmark Manager</h1>
          <h3 className='text-xl text-gray-400 max-w-[75%]'>
            A clean and simple interface to organize your favourite websites.
            Open a new browser tab and see your sites load instantly. Try it for
            free.
          </h3>
          <div className='flex gap-4'>
            <Button variant={'primary'} text={'Get It On Chrome'} />
            <Button variant={'secondary'} text={'Get It On Firebox'} />
          </div>
        </div>
        <div className='flex flex-1 relative'>
          <img src={HeaderHero} alt='Tablet' className='z-10' />
          <div className='h-[50%] w-[80%] bg-main absolute bottom-[-2rem] right-0 rounded-bl-full'></div>
        </div>
      </div>
      {/* Hero Section End */}
      {/* Features Section Start */}
      <div className='flex flex-col items-center justify-center gap-10 my-36'>
        <div className='flex flex-col gap-5 justify-center items-center max-w-[50%]'>
          <h3 className='text-center text-3xl font-bold'>Features</h3>
          <p className='max-w-[50%] text-center text-sm text-gray-400'>
            Our aim is to make it quick and easy for you to access your
            favourite websites. Your bookmarks sync between your devices so you
            can access them on the go.
          </p>
        </div>
        <div className='flex border-b border-gray-200 gap-10 text-sm'>
          <p
            className={`p-4 cursor-pointer transition-all duration-700 border-b-4  ${
              selectedFeature === 'simple'
                ? 'border-b-4 border-[#F95858]'
                : 'border-transparent'
            }`}
            onClick={() => setSelectedFeature('simple')}
          >
            Simple Bookmarking
          </p>
          <p
            className={`p-4 cursor-pointer transition-all duration-700 border-b-4 ${
              selectedFeature === 'speedy'
                ? 'border-b-4 border-[#F95858]'
                : 'border-transparent'
            }`}
            onClick={() => setSelectedFeature('speedy')}
          >
            Speedy Searching
          </p>
          <p
            className={`p-4 cursor-pointer transition-all duration-700 border-b-4 ${
              selectedFeature === 'easy'
                ? 'border-b-4 border-[#F95858]'
                : 'border-transparent'
            }`}
            onClick={() => setSelectedFeature('easy')}
          >
            Easy Sharing
          </p>
        </div>
        <div className='flex justify-between items-center w-full max-h-fit'>
          {renderFeatureContent}
        </div>
      </div>
      {/* Features Section End */}
      {/* Download Section Start */}
      <div className='flex flex-col items-center justify-center gap-36 mb-36'>
        <div className='flex flex-col gap-5 justify-center items-center max-w-[50%]'>
          <h3 className='text-center text-3xl font-bold'>
            Download the extension
          </h3>
          <p className='max-w-[50%] text-center text-sm text-gray-400'>
            We've got more browsers in the pipeline. Please do let us know if
            you've got a favourite you'd like us to prioritize.
          </p>
        </div>
        <div className='flex justify-center gap-5'>
          <ExtenstionCard
            logo={<img src={Chrome} className='mb-5' />}
            typeOfExtension={'Add to Chrome'}
            versionNumber={'Minimum Version 62'}
          />
          <ExtenstionCard
            logo={<img src={Firefox} className='mb-5' />}
            typeOfExtension={'Add to Firefox'}
            versionNumber={'Minimum Version 55'}
          />
          <ExtenstionCard
            logo={<img src={Opera} className='mb-5' />}
            typeOfExtension={'Add to Opera'}
            versionNumber={'Minimum Version 46'}
          />
        </div>
      </div>
      {/* Download Section End */}
      {/* Frequently Asked Questions Start */}
      <div className='flex flex-col items-center justify-center gap-10 mb-36'>
        <div className='flex flex-col gap-5 justify-center items-center max-w-[50%]'>
          <h3 className='text-center text-3xl font-bold'>
            Frequently Asked Questions
          </h3>
          <p className='max-w-[50%] text-center text-sm text-gray-400'>
            Here are some of our FAQs. If you have any other questions you'd
            like answered please feel free to email us.
          </p>
        </div>
        <div className='flex flex-col justify-center w-[50%]'>
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      {/* Frequently Asked Questions End */}
      <Newsletter />
    </div>
  );
};

export default Home;
