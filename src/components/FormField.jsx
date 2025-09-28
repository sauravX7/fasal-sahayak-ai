// src/components/FormField.js
import React from 'react';

// Reusable component for text and number inputs
export const FormField = ({ label, name, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">{label}</label>
    <input id={name} name={name} {...props} className="form-input w-full" />
  </div>
);

// Reusable component for select dropdowns - CORRECTED LOGIC
export const FormSelect = ({ label, name, value, onChange, options={}}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-semibold mb-2">{label}</label>
    <select id={name} name={name} value={value} onChange={onChange} className="form-select w-full">
      {Object.entries(options).map(([key, val]) => (
        <option key={key} value={key}>{val}</option>
      ))}
    </select>
  </div>
);