import React, { useState, useMemo, useEffect } from 'react';
import { VirgilService } from '../services/VirgilService.js';
import './MinosApp.css';

export default function MinosApp() {
  const [scanData, setScanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const service = useMemo(() => new VirgilService(), []);

  useEffect(() => {
    // Initialize mermaid when component mounts. 'strict' keeps HTML labels and click
    // callbacks out of diagrams, whose node names come from the ontology table.
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'strict'
      });
    }
  }, []);

  useEffect(() => {
    // Process mermaid diagrams after scan data updates
    if (scanData && typeof mermaid !== 'undefined') {
      setTimeout(() => {
        mermaid.run({
          nodes: document.querySelectorAll('.mermaid:not([data-processed])')
        });
      }, 100);
    }
  }, [scanData]);

  const runScan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await service.runMinosScan();
      setScanData(result);
    } catch (err) {
      setError('Failed to run architecture scan. Please try again.');
      console.error('Minos scan error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'healthy': return '#10b981';
      case 'partial': return '#f59e0b';
      case 'at_risk': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSeverityBadge = (severity) => {
    const colors = {
      critical: '#ef4444',
      high: '#f97316',
      medium: '#f59e0b',
      low: '#22c55e',
      info: '#3b82f6'
    };
    return {
      backgroundColor: colors[severity?.toLowerCase()] || '#6b7280',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      textTransform: 'uppercase'
    };
  };

  return (
    <div className="minos-app">
      <header className="minos-header">
        <h1>Minos Architecture Scan</h1>
        <p>Comprehensive ServiceNow instance architecture analysis</p>
        <button 
          className="scan-button" 
          onClick={runScan} 
          disabled={isLoading}
        >
          {isLoading ? 'Scanning...' : 'Run Architecture Scan'}
        </button>
      </header>

      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing architecture... This may take up to 30 seconds</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {scanData && !isLoading && (
        <div className="scan-results">
          {/* Summary Bar */}
          {scanData.summary && (
            <div className="summary-bar">
              <div className="summary-item">
                <span className="label">Plugins Scanned</span>
                <span className="value">{scanData.summary.plugins_scanned || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Tables Scanned</span>
                <span className="value">{scanData.summary.tables_scanned || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Active Nodes</span>
                <span className="value">{scanData.summary.active_nodes || 0}</span>
              </div>
              <div className="summary-item">
                <span className="label">Total Findings</span>
                <span className="value">{scanData.summary.total_findings || 0}</span>
              </div>
            </div>
          )}

          {/* IT4IT Coverage */}
          {scanData.it4it_coverage && (
            <div className="it4it-section">
              <h2>IT4IT Value Chain Coverage</h2>
              <div className="it4it-grid">
                {Object.entries(scanData.it4it_coverage).map(([chainKey, chainData]) => (
                  <div key={chainKey} className="it4it-item">
                    <div 
                      className="status-indicator"
                      style={{ backgroundColor: getStatusColor(chainData?.status) }}
                    />
                    <span className="chain-name">{chainKey}</span>
                    <span className="status-text">{chainData?.status || 'unknown'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Findings Table */}
          {scanData.findings && scanData.findings.length > 0 && (
            <div className="findings-section">
              <h2>Architecture Findings</h2>
              <div className="findings-table">
                <div className="table-header">
                  <span>Finding</span>
                  <span>Severity</span>
                  <span>Category</span>
                  <span>Recommendation</span>
                </div>
                {scanData.findings.map((finding, index) => (
                  <div key={index} className="table-row">
                    <div className="finding-content">
                      <div className="finding-title">{finding.rule_name || finding.title || 'Unknown Finding'}</div>
                      {finding.message && (
                        <div className="finding-message">{finding.message}</div>
                      )}
                    </div>
                    <span style={getSeverityBadge(finding.severity)}>
                      {finding.severity || 'unknown'}
                    </span>
                    <span className="category">{finding.category || finding.source || '-'}</span>
                    <span className="recommendation">{finding.recommendation || '-'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Diagrams */}
          {(scanData.as_is_diagram || scanData.recommended_diagram) && (
            <div className="diagrams-section">
              <h2>Architecture Diagrams</h2>
              <div className="diagrams-grid">
                {scanData.as_is_diagram && (
                  <div className="diagram-panel">
                    <h3>Current Architecture (As-Is)</h3>
                    <div className="diagram-container">
                      <pre className="mermaid">{scanData.as_is_diagram}</pre>
                    </div>
                  </div>
                )}
                {scanData.recommended_diagram && (
                  <div className="diagram-panel">
                    <h3>Recommended Architecture</h3>
                    <div className="diagram-container">
                      <pre className="mermaid">{scanData.recommended_diagram}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}