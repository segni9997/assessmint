import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './reducers/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')).render(
//  <StrictMode>
    <BrowserRouter>
       <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider>
        </ThemeProvider>
        <App /></PersistGate>
        </Provider>
    </BrowserRouter>
//   </StrictMode>
)
