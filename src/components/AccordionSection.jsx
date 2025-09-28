import React from 'react';

export const AccordionSection = ({ title, children, isOpen, onClick }) => (
  <div className="border-b">
    <button type="button" onClick={onClick} className="w-full flex justify-between items-center py-4 px-2 text-left">
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
    </button>
    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  </div>
);