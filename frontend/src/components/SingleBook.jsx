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
      <div className="max-w-4xl flex items-center space-x-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex-none">
          <img
            src={`http://localhost:8000/${coverImage.replace(/\\/g, '/')}`}
            alt="Book Cover"
            className="w-64 h-auto rounded-lg shadow"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600 font-bold mb-2">by {author}</p>
          <p className="text-black-900 mb-4">{description}</p>
          <p className="text-blue-700 font-bold text-xl mb-4">Rs {price}</p>
          <div className="flex space-x-4">
            <button
              onClick={handlePreviewDownload}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              Preview
            </button>
            <button
              onClick={handleBuy}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md flex items-center"
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBook;

