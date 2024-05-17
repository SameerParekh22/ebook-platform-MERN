import React from 'react';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Buy and Sell Your Book <span className='text-blue-700'>for the Best Prices</span>
          </h2>
          <p className='text-2xl md:w-4/5 text-gray-700'>
            Welcome to <span className="italic font-semibold">Plot Pursuit</span>, a platform exclusively dedicated to budding writers, offering a curated selection of short stories and poems. Explore, preview, and support emerging talents as they share their captivating narratives with the world.
          </p>
          <div>
            {/* <input type='search' name="search" id="search" placeholder='Search a book' className='py-2 px-2 rounded-sm outline-none'/>
            <button className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'>Search</button> */}
          </div>
        </div>
        {/* right side */}
        <div><BannerCard></BannerCard></div>
      </div>
    </div>
  );
}

export default Banner;
