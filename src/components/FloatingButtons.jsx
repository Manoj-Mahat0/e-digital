import React from 'react';
import { HiPhone } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingButtons = () => {
  const phoneNumber = '+919876543210'; // Replace with actual number
  const whatsappNumber = '9876543210'; // WhatsApp number without +

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp FAB */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp  className="w-8 h-8" />
      </a>

      {/* Phone FAB */}
      <a
        href={`tel:${phoneNumber}`}
        className="w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Call us"
      >
        <HiPhone className="w-8 h-8" />
      </a>
    </div>
  );
};

export default FloatingButtons;
