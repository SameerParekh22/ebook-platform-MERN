import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { FaCartShopping } from 'react-icons/fa6';

// import required modules
import { Pagination } from 'swiper/modules';

const BookCards = ({headline, books}) => {
  return (
    <div>
        <h2 className='text-5xl text-center font-bold text-black my-5'>{headline}</h2>
        {/*IMPORTING CARDS FROM SWIPER*/}
        <div className='mt-12'>
                <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                clickable: true,
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                
                {
                    books.map(book => <SwiperSlide key={book._id}>
                        <Link to = {`/book/${book._id}`}>
                            <div>
                                <img src={`http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}`} alt="BookCover"/>
                                <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                                    <FaCartShopping className='w-4 h-4 text-white'/>                       
                                </div>
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                            </div>
                            <div>
                                <p>$10.00</p>
                            </div>
                        </Link>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    </div>
  )
}

export default BookCards