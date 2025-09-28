import React from 'react';
import './ChatbotSidebar.css'; // Make sure you have created this CSS file

// An SVG icon provides a more polished look than an emoji.
// This is a "Sparkles" icon, often associated with AI.
const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.528l-.259 1.035a3.375 3.375 0 00-2.456-2.456l-1.035-.259 1.035-.259a3.375 3.375 0 002.456-2.456l.259-1.035.259 1.035a3.375 3.375 0 002.456 2.456l1.035.259-1.035.259a3.375 3.375 0 00-2.456 2.456z"
    />
  </svg>
);


export const ChatbotSidebar = ({ t }) => {
  // Default text values in case the `t` prop isn't provided.
  const content = {
    title: t?.chatbotTitle || "Fasal Sahayak Bot",
    welcomeTitle: t?.welcomeTitle || "Ready to assist you!",
    welcomeDescription: t?.welcomeDescription || "Get instant help by asking questions in plain English.",
    prompt1: t?.prompt1 || "Best crops for my soil type...",
    prompt2: t?.prompt2 || "Latest mandi prices for wheat...",
    prompt3: t?.prompt3 || "Diagnose a crop disease...",
    inputPlaceholder: t?.inputPlaceholder || "Ask a question...",
  };

  return (
    <aside className="hidden md:flex flex-col w-80 bg-white border-r border-gray-200 p-6 flex-shrink-0">
      <div className="sticky top-8 flex flex-col h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{content.title}</h2>
        
        {/* --- START: This is the updated section with your animation classes --- */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center text-center chatbot-placeholder-animate">
          
          {/* Icon with animation class */}
          <div className="p-4 bg-white/60 rounded-full shadow-sm mb-4 placeholder-icon-animate">
            <SparklesIcon />
          </div>
          
          {/* Welcome Text */}
          <h3 className="text-xl font-bold text-gray-800">{content.welcomeTitle}</h3>
          <p className="text-sm text-gray-500 mt-1 mb-6 max-w-xs">{content.welcomeDescription}</p>

          {/* Faux Prompt Starters with animation class */}
          <div className="w-full text-left space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">You can ask things like</p>
            <div className="bg-white/70 p-3 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-white transition-all duration-200 shadow-sm prompt-starter-card">
              {content.prompt1}
            </div>
            <div className="bg-white/70 p-3 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-white transition-all duration-200 shadow-sm prompt-starter-card">
              {content.prompt2}
            </div>
             <div className="bg-white/70 p-3 rounded-lg text-sm text-gray-700 cursor-pointer hover:bg-white transition-all duration-200 shadow-sm prompt-starter-card">
              {content.prompt3}
            </div>
          </div>
          
        </div>
        {/* --- END: Updated Section --- */}

        {/* Disabled Input Area */}
        <div className="mt-4">
          <input
            type="text"
            disabled
            placeholder={content.inputPlaceholder}
            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-sm"
          />
        </div>
      </div>
    </aside>
  );
};