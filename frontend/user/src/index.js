// Import React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import React Router
import { BrowserRouter } from 'react-router-dom';

// Import CSS files
import '../src/assets/css/style.css';
import '../src/assets/css/slicknav.min.css';
import '../src/assets/css/nice-select.css';
import '../src/assets/css/magnific-popup.css';
import '../src/assets/css/elegant-icons.css';
import '../src/assets/css/bootstrap.min.css';
import '../src/assets/css/font-awesome.min.css';
import 'animate.css';


// Import the main App component
import App from './App';
import { AuthProvider } from './context/AuthContext';


// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
