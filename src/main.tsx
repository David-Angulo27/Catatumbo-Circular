import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App';
import { ContactProvider } from './context/ContactContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ContactProvider>
        <App />
      </ContactProvider>
    </MotionConfig>
  </StrictMode>,
);
