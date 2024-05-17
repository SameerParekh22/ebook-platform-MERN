// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center bg-gradient-to-r from-blue-700 to-green-400 text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <p className="text-xl mb-4">
        Here you can upload a new book or manage/edit already uploaded books.
      </p>
      <div className="text-lg mb-8">
        <p>To upload a new book, use the options in the sidebar.</p>
        <p>To manage or edit existing books, use the options in the sidebar.</p>
      </div>
      <button
        onClick={handleGoHome}
        className="bg-white text-blue-700 rounded-md px-6 py-3 hover:bg-gray-200"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default Dashboard;
