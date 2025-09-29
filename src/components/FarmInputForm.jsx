import React, { useState } from 'react';
import { AccordionSection } from './AccordionSection';
import { FormField, FormSelect } from './FormField';

export const FarmInputForm = ({ t, onSubmit, isLoading }) => {
  const [activeAccordion, setActiveAccordion] = useState('farmInfo');
  const [formData, setFormData] = useState({
    crop: 'wheat', location: 'Kothri Kalan, Sehore', fieldSize: '5',
    soilType: 'black_cotton', soilPH: '7.2', nitrogen: '120', phosphorus: '60', potassium: '40',
    waterSource: 'canal', irrigationMethod: 'drip', annualRainfall: '950',
    avgTemp: '28', avgHumidity: '65',
    previousCrop: 'soybean', pastYield: '18', fertilizerUsed: 'mixed', commonPests: 'aphids', tillage: 'conventional',
    season: 'Kharif',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAccordionClick = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
      <AccordionSection title={`  ${t.farmInfo}`} isOpen={activeAccordion === 'farmInfo'} onClick={() => handleAccordionClick('farmInfo')}>
        <FormSelect label={t.crop} name="crop" value={formData.crop} onChange={handleInputChange} options={t.crops} />
        <FormField label={t.location} type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Kothri Kalan, Sehore" required />
        <FormField label={t.fieldSize} type="number" name="fieldSize" value={formData.fieldSize} onChange={handleInputChange} placeholder="e.g., 5" required />
      </AccordionSection>

      <AccordionSection title={` ${t.fieldDetails}`} isOpen={activeAccordion === 'fieldDetails'} onClick={() => handleAccordionClick('fieldDetails')}>
        
        <FormField label={t.nitrogen} type="number" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} placeholder="e.g., 120" />
        <FormField label={t.phosphorus} type="number" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} placeholder="e.g., 60" />
        <FormField label={t.potassium} type="number" name="potassium" value={formData.potassium} onChange={handleInputChange} placeholder="e.g., 40" />
      </AccordionSection>

       

      <AccordionSection title={` ${t.weatherClimate}`} isOpen={activeAccordion === 'weatherClimate'} onClick={() => handleAccordionClick('weatherClimate')}>
          <FormSelect label={t.season} name="season" value={formData.season} onChange={handleInputChange} options={t.seasons} />
          <FormField label={t.avgTemp} type="number" name="avgTemp" value={formData.avgTemp} onChange={handleInputChange} placeholder="e.g., 25" />
          <FormField label={t.annualRainfall} type="number" name="annualRainfall" value={formData.annualRainfall} onChange={handleInputChange} placeholder="e.g., 900" />
      </AccordionSection>

      

      <div className="pt-6">
        <button type="submit" className="cta-button w-full text-lg" disabled={isLoading}>
          {isLoading ? t.loading : t.getAdvice}
        </button>
      </div>
    </form>
  );
};