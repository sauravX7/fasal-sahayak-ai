// This file simulates a call to an AI backend.
// It's designed to be easily replaceable with a real fetch() call.

export const getAIAdvice = (formData, t) => {
  console.log("Sending data to Mock AI:", formData);

  // Promisify the timeout to mimic a real network request
  return new Promise(resolve => {
    setTimeout(() => {
      // More dynamic recommendations based on input
      let soilRec = `For your ${t.soils[formData.soilType]} soil with a pH of ${formData.soilPH}, a tailored fertilizer plan is key. Based on your NPK values (${formData.nitrogen}-${formData.phosphorus}-${formData.potassium}), consider a basal dose of DAP and Potash, followed by split applications of Urea. Adding organic compost will improve soil structure.`;

      let waterRec = `With an annual rainfall of ${formData.annualRainfall}mm and using ${t.irrigationMethods[formData.irrigationMethod]}, efficiency is crucial. For ${t.crops[formData.crop]}, schedule irrigation during critical growth stages (like flowering) and use soil moisture sensors to prevent overwatering, potentially saving 20-30% water.`;
      
      let pestRec = `Given your history with '${formData.commonPests}' and that the previous crop was '${formData.previousCrop}', crop rotation is highly recommended. Consider planting a non-host crop. For early detection, use pheromone traps and regularly scout the field. Neem oil is a good organic first-line defense.`;
      
      let mgmtRec = `While ${t.tillages[formData.tillage]} is common, consider minimum tillage on a small plot to conserve moisture and improve long-term soil health. Based on your location in "${formData.location}" and the crop being ${t.crops[formData.crop]}, we recommend a high-yield, disease-resistant seed variety. Ensure timely sowing for best results.`;

      const recommendations = {
        soil: soilRec,
        water: waterRec,
        pest: pestRec,
        mgmt: mgmtRec,
      };
      
      console.log("Received Mock AI response:", recommendations);
      resolve(recommendations);
    }, 2000); // Simulating 2-second network delay
  });
};