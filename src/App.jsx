import React, { useState } from 'react';
import './App.css';

// --- Translation Data ---
const translations = {
  en: {
    title: "Fasal Sahayak",
    subtitle: "Your AI companion for maximizing crop yield.",
    getAdvice: "Analyze Farm & Get Advice",
    loading: "Analyzing your farm's data...",
    recommendations: "Actionable Plan for Your Farm",
    // Accordion Titles
    farmInfo: "1. Basic Farm Information",
    fieldDetails: "2. Field & Soil Details",
    waterIrrigation: "3. Water & Irrigation",
    weatherClimate: "4. Weather & Climate",
    historyPractices: "5. Crop History & Practices",
    // Form Labels
    crop: "Primary Crop for this Season",
    location: "Location (Village, District)",
    fieldSize: "Field Size (in Acres)",
    soilType: "Soil Type",
    soilPH: "Soil pH Level",
    nitrogen: "Nitrogen (N) Level (kg/ha)",
    phosphorus: "Phosphorus (P) Level (kg/ha)",
    potassium: "Potassium (K) Level (kg/ha)",
    waterSource: "Primary Water Source",
    irrigationMethod: "Irrigation Method",
    annualRainfall: "Annual Rainfall (mm)",
    avgTemp: "Avg. Season Temperature (°C)",
    avgHumidity: "Avg. Season Humidity (%)",
    previousCrop: "Previous Crop Grown",
    pastYield: "Last Yield for this Crop (Quintal/Acre)",
    fertilizerUsed: "Last Fertilizer Used",
    commonPests: "Common Pests & Diseases",
    tillage: "Tillage Practice",
    // Options
    crops: { wheat: "Wheat", rice: "Rice", corn: "Corn", sugarcane: "Sugarcane", cotton: "Cotton", soybean: "Soybean", potato: "Potato" },
    soils: { loamy: "Loamy", clay: "Clay", sandy: "Sandy", silty: "Silty", black_cotton: "Black Cotton" },
    waterSources: { rainfall: "Rainfall", canal: "Canal", borewell: "Borewell", river: "River", pond: "Pond/Tank" },
    irrigationMethods: { drip: "Drip Irrigation", sprinkler: "Sprinkler", flood: "Flood Irrigation", furrow: "Furrow" },
    fertilizers: { organic: "Organic (Manure)", chemical_urea: "Urea", chemical_dap: "DAP", mixed: "Mixed/NPK" },
    tillages: { conventional: "Conventional Tillage", no_till: "No-Till / Zero Tillage", minimum: "Minimum Tillage" },
    // Recommendations
    soilHealth: "Soil Health & Fertilization",
    waterMgmt: "Irrigation & Water Management",
    pestDisease: "Pest & Disease Control",
    cropMgmt: "Crop Management & Practices",
    yieldGain: "Potential Yield Maximization: 15-20%",
  },
  hi: {
    title: "फसल सहायक",
    subtitle: "फसल की उपज को अधिकतम करने के लिए आपका AI साथी।",
    getAdvice: "खेत का विश्लेषण करें और सलाह लें",
    loading: "आपके खेत के डेटा का विश्लेषण किया जा रहा है...",
    recommendations: "आपके खेत के लिए कार्य योजना",
    // Accordion Titles
    farmInfo: "1. खेत की सामान्य जानकारी",
    fieldDetails: "2. खेत और मिट्टी का विवरण",
    waterIrrigation: "3. पानी और सिंचाई",
    weatherClimate: "4. मौसम और जलवायु",
    historyPractices: "5. फसल इतिहास और प्रथाएं",
    // Form Labels
    crop: "इस मौसम की मुख्य फसल",
    location: "स्थान (गाँव, जिला)",
    fieldSize: "खेत का आकार (एकड़ में)",
    soilType: "मिट्टी का प्रकार",
    soilPH: "मिट्टी का पीएच स्तर",
    nitrogen: "नाइट्रोजन (N) स्तर (किग्रा/हेक्टेयर)",
    phosphorus: "फॉस्फोरस (P) स्तर (किग्रा/हेक्टेयर)",
    potassium: "पोटेशियम (K) स्तर (किग्रा/हेक्टेयर)",
    waterSource: "प्राथमिक जल स्रोत",
    irrigationMethod: "सिंचाई विधि",
    annualRainfall: "वार्षिक वर्षा (मिमी)",
    avgTemp: "औसत मौसम तापमान (°C)",
    avgHumidity: "औसत मौसम आर्द्रता (%)",
    previousCrop: "पिछली फसल",
    pastYield: "इस फसल की पिछली उपज (क्विंटल/एकड़)",
    fertilizerUsed: "पिछली बार इस्तेमाल किया गया उर्वरक",
    commonPests: "आम कीट और रोग",
    tillage: "जुताई की प्रथा",
    // Options
    crops: { wheat: "गेहूँ", rice: "चावल", corn: "मक्का", sugarcane: "गन्ना", cotton: "कपास", soybean: "सोयाबीन", potato: "आलू" },
    soils: { loamy: "दोमट", clay: "चिकनी", sandy: "रेतीली", silty: "गाद", black_cotton: "काली कपास मिट्टी" },
    waterSources: { rainfall: "वर्षा", canal: "नहर", borewell: "बोरवेल", river: "नदी", pond: "तालाब" },
    irrigationMethods: { drip: "ड्रिप सिंचाई", sprinkler: "स्प्रिंकलर", flood: "बाढ़ सिंचाई", furrow: "कुंड सिंचाई" },
    fertilizers: { organic: "जैविक (खाद)", chemical_urea: "यूरिया", chemical_dap: "डीएपी", mixed: "मिश्रित/एनपीके" },
    tillages: { conventional: "पारंपरिक जुताई", no_till: "बिना जुताई", minimum: "न्यूनतम जुताई" },
    // Recommendations
    soilHealth: "मृदा स्वास्थ्य और उर्वरीकरण",
    waterMgmt: "सिंचाई और जल प्रबंधन",
    pestDisease: "कीट और रोग नियंत्रण",
    cropMgmt: "फसल प्रबंधन और प्रथाएं",
    yieldGain: "संभावित उपज अधिकतमकरण: 15-20%",
  },
  or: {
    title: "ଫସଲ ସହାୟକ",
    subtitle: "ଆପଣଙ୍କର ଫସଲ ଅମଳକୁ ସର୍ବାଧିକ କରିବା ପାଇଁ AI ସାଥୀ |",
    getAdvice: "ଫାର୍ମ ବିଶ୍ଳେଷଣ କରନ୍ତୁ ଏବଂ ପରାମର୍ଶ ପାଆନ୍ତୁ",
    loading: "ଆପଣଙ୍କ ଫାର୍ମର ତଥ୍ୟ ବିଶ୍ଳେଷଣ କରାଯାଉଛି...",
    recommendations: "ଆପଣଙ୍କ ଫାର୍ମ ପାଇଁ କାର୍ଯ୍ୟ ଯୋଜନା",
    // Accordion Titles
    farmInfo: "1. ସାଧାରଣ ଫାର୍ମ ସୂଚନା",
    fieldDetails: "2. କ୍ଷେତ୍ର ଏବଂ ମୃତ୍ତିକା ବିବରଣୀ",
    waterIrrigation: "3. ଜଳ ଏବଂ ଜଳସେଚନ",
    weatherClimate: "4. ପାଣିପାଗ ଏବଂ ଜଳବାୟୁ",
    historyPractices: "5. ଫସଲ ଇତିହାସ ଏବଂ ଅଭ୍ୟାସ",
    // Form Labels
    crop: "ଏହି ଋତୁ ପାଇଁ ମୁଖ୍ୟ ଫସଲ",
    location: "ସ୍ଥାନ (ଗାଁ, ଜିଲ୍ଲା)",
    fieldSize: "କ୍ଷେତ୍ର ଆକାର (ଏକରରେ)",
    soilType: "ମୃତ୍ତିକା ପ୍ରକାର",
    soilPH: "ମୃତ୍ତିକା pH ସ୍ତର",
    nitrogen: "ନାଇଟ୍ରୋଜେନ୍ (N) ସ୍ତର (kg/ha)",
    phosphorus: "ଫସଫରସ୍ (P) ସ୍ତର (kg/ha)",
    potassium: "ପୋଟାସିୟମ୍ (K) ସ୍ତର (kg/ha)",
    waterSource: "ପ୍ରାଥମିକ ଜଳ ଉତ୍ସ",
    irrigationMethod: "ଜଳସେଚନ ପଦ୍ଧତି",
    annualRainfall: "ବାର୍ଷିକ ବୃଷ୍ଟିପାତ (mm)",
    avgTemp: "ଋତୁର ହାରାହାରି ତାପମାତ୍ରା (°C)",
    avgHumidity: "ଋତୁର ହାରାହାରି ଆର୍ଦ୍ରତା (%)",
    previousCrop: "ପୂର୍ବବର୍ତ୍ତୀ ଫସଲ",
    pastYield: "ଏହି ଫସଲ ପାଇଁ ଗତ ଅମଳ (କ୍ୱିଣ୍ଟାଲ/ଏକର)",
    fertilizerUsed: "ଶେଷ ବ୍ୟବହୃତ ସାର",
    commonPests: "ସାଧାରଣ କୀଟ ଏବଂ ରୋଗ",
    tillage: "ହଳ କରିବା ଅଭ୍ୟାସ",
    // Options
    crops: { wheat: "ଗହମ", rice: "ଧାନ", corn: "ମକା", sugarcane: "ଆଖୁ", cotton: "କପା", soybean: "ସୋୟାବିନ୍", potato: "ଆଳୁ" },
    soils: { loamy: "ଦୋରସା", clay: "କାଦୁଅ", sandy: "ବାଲିଆ", silty: "ପଟୁ", black_cotton: "କଳା କପା ମାଟି" },
    waterSources: { rainfall: "ବର୍ଷା", canal: "କେନାଲ", borewell: "ବୋରୱେଲ", river: "ନଦୀ", pond: "ପୋଖରୀ" },
    irrigationMethods: { drip: "ଡ୍ରିପ୍ ଜଳସେଚନ", sprinkler: "ସ୍ପ୍ରିଙ୍କଲର", flood: "ବା बाढ़ ଜଳସେଚନ", furrow: "ଫୁରୋ ଜଳସେଚନ" },
    fertilizers: { organic: "ଜୈବିକ (ଖତ)", chemical_urea: "ୟୁରିଆ", chemical_dap: "DAP", mixed: "ମିଶ୍ରିତ/NPK" },
    tillages: { conventional: "ପାରମ୍ପାରିକ ହଳ", no_till: "ବିନା ହଳ", minimum: "ନ્યૂନତମ ହଳ" },
    // Recommendations
    soilHealth: "ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ସାର ପ୍ରୟୋଗ",
    waterMgmt: "ଜଳସେଚନ ଏବଂ ଜଳ ପରିଚାଳନା",
    pestDisease: "କୀଟ ଏବଂ ରୋଗ ନିୟନ୍ତ୍ରଣ",
    cropMgmt: "ଫସଲ ପରିଚାଳନା ଏବଂ ଅଭ୍ୟାସ",
    yieldGain: "ସମ୍ଭାବ୍ୟ ଅମଳ ସର୍ବାଧିକୀକରଣ: 15-20%",
  }
};

// --- Accordion Component ---
const AccordionSection = ({ title, children, isOpen, onClick }) => (
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


// --- Main App Component ---
function App() {
  const [lang, setLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState('farmInfo');
  
  const [formData, setFormData] = useState({
    crop: 'wheat', location: '', fieldSize: '',
    soilType: 'loamy', soilPH: '6.5', nitrogen: '120', phosphorus: '60', potassium: '40',
    waterSource: 'canal', irrigationMethod: 'drip', annualRainfall: '700',
    avgTemp: '25', avgHumidity: '60',
    previousCrop: 'soybean', pastYield: '15', fertilizerUsed: 'mixed', commonPests: 'aphids', tillage: 'conventional',
  });
  const t = translations[lang];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAccordionClick = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleGetAdvice = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations(null);

    setTimeout(() => {
      let recs = {
        soil: `For your ${t.soils[formData.soilType]} soil with a pH of ${formData.soilPH}, a tailored fertilizer plan is key. Based on your NPK values, consider a basal dose of DAP and Potash, followed by split applications of Urea.`,
        water: `With ${formData.annualRainfall}mm rainfall, using ${t.irrigationMethods[formData.irrigationMethod]} is a good choice. Schedule irrigation during critical growth stages and use soil moisture sensors to avoid overwatering, saving 20% water.`,
        pest: `Since you faced ${formData.commonPests} and your previous crop was ${formData.previousCrop}, crop rotation is crucial. We recommend planting a non-host crop next. Use pheromone traps for early pest detection.`,
        mgmt: `Using ${t.tillages[formData.tillage]} is standard, but consider minimum tillage to improve soil health and water retention. Based on your location and sowing date, a high-yield seed variety like 'HD-2967' for wheat is advised.`,
      };
      setRecommendations(recs);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="hero-bg text-white text-center py-20 px-4 relative">
         <div className="language-switcher">
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
          <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>HI</button>
          <button onClick={() => setLang('or')} className={lang === 'or' ? 'active' : ''}>OR</button>
        </div>
        <h1 className="text-5xl font-extrabold mb-2">{t.title}</h1>
        <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <form onSubmit={handleGetAdvice} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          
          <AccordionSection title={t.farmInfo} isOpen={activeAccordion === 'farmInfo'} onClick={() => handleAccordionClick('farmInfo')}>
            <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.crop}</label>
                <select name="crop" value={formData.crop} onChange={handleInputChange} className="form-select w-full">
                  {Object.entries(t.crops).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.location}</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g., Kothri Kalan, Sehore" className="form-input w-full" required />
            </div>
          </AccordionSection>

          <AccordionSection title={t.fieldDetails} isOpen={activeAccordion === 'fieldDetails'} onClick={() => handleAccordionClick('fieldDetails')}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.fieldSize}</label>
              <input type="number" name="fieldSize" value={formData.fieldSize} onChange={handleInputChange} placeholder="e.g., 5" className="form-input w-full" required />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.soilType}</label>
              <select name="soilType" value={formData.soilType} onChange={handleInputChange} className="form-select w-full">{Object.entries(t.soils).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.soilPH}</label>
              <input type="number" step="0.1" name="soilPH" value={formData.soilPH} onChange={handleInputChange} placeholder="e.g., 6.8" className="form-input w-full" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.nitrogen}</label>
              <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleInputChange} placeholder="e.g., 120" className="form-input w-full" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.phosphorus}</label>
              <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleInputChange} placeholder="e.g., 60" className="form-input w-full" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.potassium}</label>
              <input type="number" name="potassium" value={formData.potassium} onChange={handleInputChange} placeholder="e.g., 40" className="form-input w-full" />
            </div>
          </AccordionSection>

          <AccordionSection title={t.waterIrrigation} isOpen={activeAccordion === 'waterIrrigation'} onClick={() => handleAccordionClick('waterIrrigation')}>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.waterSource}</label>
              <select name="waterSource" value={formData.waterSource} onChange={handleInputChange} className="form-select w-full">{Object.entries(t.waterSources).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.irrigationMethod}</label>
              <select name="irrigationMethod" value={formData.irrigationMethod} onChange={handleInputChange} className="form-select w-full">{Object.entries(t.irrigationMethods).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">{t.annualRainfall}</label>
              <input type="number" name="annualRainfall" value={formData.annualRainfall} onChange={handleInputChange} placeholder="e.g., 900" className="form-input w-full" />
            </div>
          </AccordionSection>
          
          <AccordionSection title={t.weatherClimate} isOpen={activeAccordion === 'weatherClimate'} onClick={() => handleAccordionClick('weatherClimate')}>
             <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.avgTemp}</label>
                <input type="number" name="avgTemp" value={formData.avgTemp} onChange={handleInputChange} placeholder="e.g., 25" className="form-input w-full" />
            </div>
             <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.avgHumidity}</label>
                <input type="number" name="avgHumidity" value={formData.avgHumidity} onChange={handleInputChange} placeholder="e.g., 60" className="form-input w-full" />
            </div>
          </AccordionSection>

          <AccordionSection title={t.historyPractices} isOpen={activeAccordion === 'historyPractices'} onClick={() => handleAccordionClick('historyPractices')}>
             <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.previousCrop}</label>
                <input type="text" name="previousCrop" value={formData.previousCrop} onChange={handleInputChange} placeholder="e.g., Soybean" className="form-input w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.pastYield}</label>
                <input type="number" name="pastYield" value={formData.pastYield} onChange={handleInputChange} placeholder="e.g., 15" className="form-input w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.fertilizerUsed}</label>
                 <select name="fertilizerUsed" value={formData.fertilizerUsed} onChange={handleInputChange} className="form-select w-full">{Object.entries(t.fertilizers).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
              </div>
               <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.commonPests}</label>
                <input type="text" name="commonPests" value={formData.commonPests} onChange={handleInputChange} placeholder="e.g., Whitefly, Stem Borer" className="form-input w-full" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t.tillage}</label>
                <select name="tillage" value={formData.tillage} onChange={handleInputChange} className="form-select w-full">{Object.entries(t.tillages).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
              </div>
          </AccordionSection>
          
          <div className="pt-6">
            <button type="submit" className="cta-button w-full text-lg" disabled={isLoading}>
              {isLoading ? t.loading : t.getAdvice}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}

        {recommendations && (
          <div className="mt-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t.recommendations}</h2>
            <div className="space-y-6">
              <div className="result-card p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">🌱 {t.soilHealth}</h3>
                <p className="text-gray-600">{recommendations.soil}</p>
              </div>
              <div className="result-card p-6">
                <h3 className="text-xl font-bold text-blue-700 mb-2">💧 {t.waterMgmt}</h3>
                <p className="text-gray-600">{recommendations.water}</p>
              </div>
              <div className="result-card p-6">
                <h3 className="text-xl font-bold text-red-700 mb-2">🐞 {t.pestDisease}</h3>
                <p className="text-gray-600">{recommendations.pest}</p>
              </div>
               <div className="result-card p-6">
                <h3 className="text-xl font-bold text-yellow-700 mb-2">🌾 {t.cropMgmt}</h3>
                <p className="text-gray-600">{recommendations.mgmt}</p>
              </div>
              <div className="text-center mt-8 p-4 bg-green-100 border border-green-300 text-green-800 font-bold rounded-lg">
                {t.yieldGain}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

