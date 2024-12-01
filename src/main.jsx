import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { JournalApp } from './JournalApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ store }>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
