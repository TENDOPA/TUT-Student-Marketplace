import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css';

// HashRouter (not BrowserRouter) is used deliberately: GitHub Pages has no
// server-side rewrite rules, so a BrowserRouter deep link like
// /TUT-Student-Marketplace/marketplace gets a 404 from GitHub's static file
// server on refresh. HashRouter keeps all routing client-side after
// /#/marketplace, which always resolves to index.html first — no 404s,
// no blank page on refresh or direct link.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
