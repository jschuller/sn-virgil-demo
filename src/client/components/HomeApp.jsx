import React from 'react';
import './HomeApp.css';

export default function HomeApp() {
  const navigateToPage = (endpoint) => {
    window.location.href = `/${endpoint}`;
  };

  return (
    <div className="virgil-home">
      <header className="virgil-header">
        <h1>Virgil</h1>
        <p className="subtitle">ServiceNow Architecture and Pricing Intelligence Platform</p>
      </header>

      <div className="nav-cards-container">
        <div className="nav-card minos-card" onClick={() => navigateToPage('x_9418_virgil_minos.do')}>
          <div className="card-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h2>Minos</h2>
          <p>Architecture Scan</p>
          <div className="card-description">
            Comprehensive ServiceNow instance architecture analysis with IT4IT framework mapping
          </div>
        </div>

        <div className="nav-card plutus-card" onClick={() => navigateToPage('x_9418_virgil_plutus.do')}>
          <div className="card-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2>Plutus</h2>
          <p>WDF Credit Sizing</p>
          <div className="card-description">
            Workflow Development Framework credit analysis and capability sizing
          </div>
        </div>

        <div className="nav-card chat-card" onClick={() => navigateToPage('x_9418_virgil_chat.do')}>
          <div className="card-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <h2>Virgil Chat</h2>
          <p>AI Advisor</p>
          <div className="card-description">
            Intelligent ServiceNow architecture and pricing guidance powered by AI
          </div>
        </div>
      </div>
    </div>
  );
}