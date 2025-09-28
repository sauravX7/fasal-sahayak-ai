import React from 'react';

export const Header = ({ t, setLang, lang }) => (
  <header className="hero-bg text-white text-center py-20 px-4 relative">
    <div className="language-switcher">
      <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
      <button onClick={() => setLang('hi')} className={lang === 'hi' ? 'active' : ''}>HI</button>
      <button onClick={() => setLang('or')} className={lang === 'or' ? 'active' : ''}>OR</button>
    </div>
    <h1 className="text-5xl font-extrabold mb-2">{t.title}</h1>
    <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
  </header>
);