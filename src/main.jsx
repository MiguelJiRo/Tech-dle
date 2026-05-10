import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'
import { ToastProvider } from './toast/ToastProvider'
import { SettingsProvider } from './settings/SettingsProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <LanguageProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LanguageProvider>
    </SettingsProvider>
  </StrictMode>,
)
