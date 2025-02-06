// src/main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lang/i18n.js';  
import { I18nextProvider } from 'react-i18next';  
import App from './App.jsx';
import i18n from './lang/i18n.js';  

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
