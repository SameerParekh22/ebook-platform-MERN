import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

function SingleBook() {
  const {id} = useParams();
  const {title,author,category,description,coverImage,pdfUrl} = useLoaderData();
  // return (
  //   <div className='mt-28 px-4 lg:px-24'>
  //     <img src={coverImage} alt="Cover Page" className='h-96'></img>
  //     <h2>{title}</h2>
  //   </div>
  // )
  const handlePreviewDownload = () => {
    // Add logic to download preview PDF (3-4 pages)
  };

  // Function to handle buying the book
  const handleBuy = () => {
    // Add logic to handle buying the book
  };

  return (
      <div className="flex justify-center bg-gray-100 min-h-screen py-8">
        <div className="max-w-4xl flex items-center space-x-8 bg-white p-8 rounded-lg shadow-lg">
          {/* Book Cover */}
          <div className="flex-none">
            <img src={`http://localhost:8000/${coverImage.replace(/\\/g, '/')}`} alt="Book Cover" className="w-64 h-auto rounded-lg shadow"/>
          </div>
  
          {/* Book Details */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">by {author}</p>
            <p className="text-gray-600 mb-4">{description}</p>
  
            {/* Buttons */}
            <div>
              <button onClick={handlePreviewDownload} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mr-4">Preview</button>
              <button onClick={handleBuy} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default SingleBook