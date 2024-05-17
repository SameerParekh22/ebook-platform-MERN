import React from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function SingleBook() {
  const { id } = useParams();
  const { title, author, category, description, coverImage, price } = useLoaderData();
  const navigate = useNavigate();
  const { dispatch } = useCart();

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
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, title, author, coverImage, price }
    });
    navigate('/cart');
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-none">
            <img
              src={`http://localhost:8000/${coverImage.replace(/\\/g, '/')}`}
              alt="Book Cover"
              className="w-64 h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-700 italic font-bold text-lg">by {author}</p>
            <p className="text-gray-600">{description}</p>
            <p className="text-gray-900 font-bold text-2xl">Rs {price}</p>
            <div className="flex space-x-4">
              <button
                onClick={handlePreviewDownload}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-lg shadow-md flex items-center"
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Preview
              </button>
              <button
                onClick={handleBuy}
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg shadow-md flex items-center"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
