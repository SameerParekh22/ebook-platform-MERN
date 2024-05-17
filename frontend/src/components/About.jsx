import React from 'react';
import { FaBook, FaQuestionCircle, FaLaptopCode } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="text-gray-800 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">About <span className="italic font-semibold">Plot-Pursuit</span></h2>
        <div className="mb-8">
          <div className="mb-8">
            <FaQuestionCircle className="text-4xl mb-2" />
            <h3 className="text-3xl font-bold mb-2">How it Works</h3>
            <p className='text-xl'>Explore the <span className="font-semibold">Plot-Pursuit</span> platform to uncover compelling short stories and poignant poems by budding writers. Dive into a preview of their work to decide if it resonates with you. Support aspiring authors by purchasing their literary creations.</p>
          </div>
          <div className="mb-8">
            <FaBook className="text-4xl mb-2" />
            <h3 className="text-3xl font-bold mb-2">Who We Are</h3>
            <p className='text-xl'><span className="font-semibold">Plot-Pursuit</span> is a creative haven dedicated to empowering emerging writers to share their imaginative narratives. We are committed to fostering a nurturing community where aspiring authors can showcase their talent and thrive.</p>
          </div>
          <div>
            <FaLaptopCode className="text-4xl mb-2" />
            <h3 className="text-3xl font-bold mb-2">How it's Created</h3>
            <p className='text-xl'>The <span className="font-semibold">Plot-Pursuit</span> platform is meticulously crafted using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This cutting-edge technology stack enables us to build a dynamic and user-friendly e-book selling platform tailored for new writers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
