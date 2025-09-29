import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Data and API
import { translations } from './i18n/translations';
import { getAIAdvice } from './api/mockApi';

// Components
import { Header } from './components/Header';
import { ChatbotSidebar } from './components/ChatbotSidebar';
import { FarmInputForm } from './components/FarmInputForm';
import { Recommendations } from './components/Recommendations';

function App() {
  const [lang, setLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const recommendationsRef = useRef(null); // For auto-scrolling

  const t = translations[lang];

  // Effect to scroll to recommendations when they appear
  useEffect(() => {
    if (recommendations && recommendationsRef.current) {
      recommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [recommendations]);


  const handleGetAdvice = async (formData) => {
    setIsLoading(true);
    setRecommendations(null); // Clear old recommendations
    
    // Get new recommendations from our mock API
    const recs = await getAIAdvice(formData, t);
    
    setRecommendations(recs);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header t={t} setLang={setLang} lang={lang} />
      
      <div className="flex">
        

        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <FarmInputForm t={t} onSubmit={handleGetAdvice} isLoading={isLoading} />
            
            {isLoading && (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            )}
            
            <Recommendations 
              recommendations={recommendations} 
              t={t} 
              elementRef={recommendationsRef} 
            />
          </div>
          
        </main>
        <ChatbotSidebar t={t} />

      </div>
      
    </div>
  );
}

export default App;