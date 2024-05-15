import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto flex justify-between items-start px-4">
        {/* Left Side: Website Name and Slogan */}
        <div className="text-left">
          <h1 className="text-2xl font-bold">Plot Pursuit</h1>
          <p className="text-sm mt-1">Unraveling Stories, One Plot at a Time</p>
        </div>

        {/* Right Side: Contact Information */}
        <div className="text-right pr-4">
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <p className>
            <FontAwesomeIcon icon={faPhone} className="mr-2" />
            +91-9406298880
          </p>
          <p className="flex items-center mt-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            contact@plotpursuit.com
          </p>
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 justify-end">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
