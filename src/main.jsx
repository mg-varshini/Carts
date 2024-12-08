import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
//import './Carts.css';
//import {Cart} from './Carts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />  <Cart/>*/}
    <App />
  </StrictMode>,
)
