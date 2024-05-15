// import React from 'react'
// import { useLoaderData, useParams } from 'react-router-dom'

// function SingleBook() {
//   const {id} = useParams();
//   const {title,author,category,description,coverImage,pdfUrl} = useLoaderData();
//   // return (
//   //   <div className='mt-28 px-4 lg:px-24'>
//   //     <img src={coverImage} alt="Cover Page" className='h-96'></img>
//   //     <h2>{title}</h2>
//   //   </div>
//   // )
//   const handlePreviewDownload = () => {
//     // Add logic to download preview PDF (3-4 pages)
//   };

//   // Function to handle buying the book
//   const handleBuy = () => {
//     // Add logic to handle buying the book
//   };

//   return (
//       <div className="flex justify-center bg-gray-100 min-h-screen py-8">
//         <div className="max-w-4xl flex items-center space-x-8 bg-white p-8 rounded-lg shadow-lg">
//           {/* Book Cover */}
//           <div className="flex-none">
//             <img src={`http://localhost:8000/${coverImage.replace(/\\/g, '/')}`} alt="Book Cover" className="w-64 h-auto rounded-lg shadow"/>
//           </div>
  
//           {/* Book Details */}
//           <div className="flex flex-col">
//             <h2 className="text-3xl font-bold mb-2">{title}</h2>
//             <p className="text-gray-600 mb-2">by {author}</p>
//             <p className="text-gray-600 mb-4">{description}</p>
  
//             {/* Buttons */}
//             <div>
//               <button onClick={handlePreviewDownload} className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mr-4">Preview</button>
//               <button onClick={handleBuy} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">Buy Now</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

// export default SingleBook

import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

function SingleBook() {
  const { id } = useParams();
  const { title, author, category, description, coverImage, pdfUrl } = useLoaderData();

  //For Directly Downloading the pdf

  // const handlePreviewDownload = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/preview/${id}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/pdf',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to download preview');
  //     }

  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'preview.pdf');
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();

  //     alert('This was the preview. Buy the full copy of the book to continue reading.');
  //   } catch (error) {
  //     console.error('Failed to download preview:', error);
  //     alert('Failed to download preview.');
  //   }
  // };

  const handlePreviewDownload = async () => {
    try {
      const response = await fetch(`http://localhost:8000/preview/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch preview');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      alert('This was the preview. Buy the full copy of the book to continue reading.');
    } catch (error) {
      console.error('Failed to open preview:', error);
      alert('Failed to open preview.');
    }
  };

  const handleBuy = () => {
    alert('Buy functionality to be implemented.');
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl flex items-center space-x-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Book Cover */}
        <div className="flex-none">
          <img
            src={`http://localhost:8000/${coverImage.replace(/\\/g, '/')}`}
            alt="Book Cover"
            className="w-64 h-auto rounded-lg shadow"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 font-bold mb-2">by {author}</p>
          <p className="text-black-900 mb-4">{description}</p>

          {/* Buttons */}
          <div>
            <button
              onClick={handlePreviewDownload}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md mr-4"
            >
              Preview
            </button>
            <button
              onClick={handleBuy}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
