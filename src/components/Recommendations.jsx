import React from 'react';

export const Recommendations = ({ recommendations, t, elementRef }) => {

  // Define ResultCard INSIDE the Recommendations component
  const ResultCard = ({ title, icon, color, children }) => (
    <div className="result-card p-6">
      <h3 className={`text-xl font-bold ${color} mb-2`}>{icon} {title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );

  if (!recommendations) {
    return (
      <div ref={elementRef} className="mt-12 text-center p-8 bg-gray-100 rounded-lg">
        <p className="text-gray-600">{t.emptyRecommendations}</p>
      </div>
    );
  }

  return (
    <div ref={elementRef} className="mt-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{t.recommendations}</h2>
      <div className="space-y-6">
        <ResultCard title={t.soilHealth} icon="🌱" color="text-green-700">
          {recommendations.soil}
        </ResultCard>
        <ResultCard title={t.waterMgmt} icon="💧" color="text-blue-700">
          {recommendations.water}
        </ResultCard>
        <ResultCard title={t.pestDisease} icon="🐞" color="text-red-700">
          {recommendations.pest}
        </ResultCard>
        <ResultCard title={t.cropMgmt} icon="🌾" color="text-yellow-700">
          {recommendations.mgmt}
        </ResultCard>

        <div className="text-center mt-8 p-4 bg-green-100 border border-green-300 text-green-800 font-bold rounded-lg">
          📈 {t.yieldGain}
        </div>
      </div>
    </div>
  );
};