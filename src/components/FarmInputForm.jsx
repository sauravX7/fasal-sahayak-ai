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
        <FormSelect label={t.soilType} name="soilType" value={formData.soilType} onChange={handleInputChange} options={t.soils} />
        <FormField label={t.soilPH} type="number" step="0.1" name="soilPH" value={formData.soilPH} onChange={handleInputChange} placeholder="e.g., 6.8" />
        <FormField label={t.nitrogen} type="number" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} placeholder="e.g., 120" />
        <FormField label={t.phosphorus} type="number" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} placeholder="e.g., 60" />
        <FormField label={t.potassium} type="number" name="potassium" value={formData.potassium} onChange={handleInputChange} placeholder="e.g., 40" />
      </AccordionSection>

       <AccordionSection title={` ${t.waterIrrigation}`} isOpen={activeAccordion === 'waterIrrigation'} onClick={() => handleAccordionClick('waterIrrigation')}>
          <FormSelect label={t.waterSource} name="waterSource" value={formData.waterSource} onChange={handleInputChange} options={t.waterSources}/>
          <FormSelect label={t.irrigationMethod} name="irrigationMethod" value={formData.irrigationMethod} onChange={handleInputChange} options={t.irrigationMethods}/>
          <FormField label={t.annualRainfall} type="number" name="annualRainfall" value={formData.annualRainfall} onChange={handleInputChange} placeholder="e.g., 900" />
      </AccordionSection>

      <AccordionSection title={` ${t.weatherClimate}`} isOpen={activeAccordion === 'weatherClimate'} onClick={() => handleAccordionClick('weatherClimate')}>
          <FormField label={t.avgTemp} type="number" name="avgTemp" value={formData.avgTemp} onChange={handleInputChange} placeholder="e.g., 25" />
          <FormField label={t.avgHumidity} type="number" name="avgHumidity" value={formData.avgHumidity} onChange={handleInputChange} placeholder="e.g., 60" />
      </AccordionSection>

      <AccordionSection title={` ${t.historyPractices}`} isOpen={activeAccordion === 'historyPractices'} onClick={() => handleAccordionClick('historyPractices')}>
          <FormField label={t.previousCrop} type="text" name="previousCrop" value={formData.previousCrop} onChange={handleInputChange} placeholder="e.g., Soybean" />
          <FormField label={t.pastYield} type="number" name="pastYield" value={formData.pastYield} onChange={handleInputChange} placeholder="e.g., 15" />
          <FormSelect label={t.fertilizerUsed} name="fertilizerUsed" value={formData.fertilizerUsed} onChange={handleInputChange} options={t.fertilizers}/>
          <FormField label={t.commonPests} type="text" name="commonPests" value={formData.commonPests} onChange={handleInputChange} placeholder="e.g., Whitefly, Stem Borer" />
          <FormSelect label={t.tillage} name="tillage" value={formData.tillage} onChange={handleInputChange} options={t.tillages}/>
      </AccordionSection>

      <div className="pt-6">
        <button type="submit" className="cta-button w-full text-lg" disabled={isLoading}>
          {isLoading ? t.loading : t.getAdvice}
        </button>
      </div>
    </form>
  );
};