// import React from 'react';
// import { useCart } from '../contexts/CartContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashAlt, faBook } from '@fortawesome/free-solid-svg-icons';

// const ShoppingCart = () => {
//   const { cart } = useCart();

//   const totalAmount = cart.reduce((acc, book) => acc + book.price, 0);

//   return (
//     <div className="flex justify-center bg-gray-100 min-h-screen py-8">
//       <div className="max-w-7xl w-full flex space-x-8 bg-white p-8 rounded-lg shadow-lg">
//         {/* Cart Items */}
//         <div className="w-2/3">
//           <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
//           {cart.length === 0 ? (
//             <p className="text-gray-600">Your cart is empty</p>
//           ) : (
//             cart.map((book, index) => (
//               <div key={index} className="flex items-center mb-4 p-4 border-b">
//                 <img
//                   src={`http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}`}
//                   alt="Book Cover"
//                   className="w-20 h-auto rounded-lg shadow mr-4"
//                 />
//                 <div>
//                   <h3 className="text-xl font-bold">{book.title}</h3>
//                   <p className="text-gray-600">by {book.author}</p>
//                   <p className="text-blue-700 font-bold">Rs {book.price}</p>
//                 </div>
//                 <button className="text-red-600 hover:text-red-800">
//                   <FontAwesomeIcon icon={faTrashAlt} size="lg" />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Total Amount and Payment */}
//         <div className="w-1/3 p-4 border-l">
//           <h2 className="text-3xl font-bold mb-4">Summary</h2>
//           <div className="text-xl font-bold text-gray-900 mb-2">
//             Total: <span className="text-blue-700">Rs {totalAmount.toFixed(2)}</span> {/*toFixed use to represent numbers in string format upto 2 decimal notations*/}
//           </div>
//           <button
//             className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md w-full"
//             onClick={() => alert('Payment functionality to be implemented.')}
//           >
//             <FontAwesomeIcon icon={faBook} className="mr-2" />
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;

import React from 'react';
import { useCart } from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBook, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const ShoppingCart = () => {
  const { cart, dispatch } = useCart();

  const totalAmount = cart.reduce((acc, book) => acc + book.price * book.quantity, 0);

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl w-full flex space-x-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Cart Items */}
        <div className="w-2/3">
          <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            cart.map((book, index) => (
              <div key={index} className="flex items-center mb-4 p-4 border-b">
                <img
                  src={`http://localhost:8000/${book.coverImage.replace(/\\/g, '/')}`}
                  alt="Book Cover"
                  className="w-20 h-auto rounded-lg shadow mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                  <p className="text-blue-700 font-bold">Rs {book.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                      onClick={() => handleQuantityChange(book.id, book.quantity - 1)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span className="mx-2">{book.quantity}</span>
                    <button
                      className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md"
                      onClick={() => handleQuantityChange(book.id, book.quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button className="text-red-600 hover:text-red-800" onClick={() => handleRemove(book.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total Amount and Payment */}
        <div className="w-1/3 p-4 border-l">
          <h2 className="text-3xl font-bold mb-4">Summary</h2>
          <div className="text-xl font-bold text-gray-900 mb-2">
            Total: <span className="text-blue-700">Rs {totalAmount.toFixed(2)}</span>
          </div>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md w-full flex items-center justify-center"
            onClick={() => alert('Payment functionality to be implemented.')}
          >
            <FontAwesomeIcon icon={faBook} className="mr-2" />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
