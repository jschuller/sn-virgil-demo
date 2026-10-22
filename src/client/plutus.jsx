import React from 'react';
import ReactDOM from 'react-dom/client';
import { VirgilService } from './services/VirgilService.js';

function PlutusApp() {
  const [scanData, setScanData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  const service = React.useMemo(() => new VirgilService(), []);

  const runScan = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await service.runPlutusScan();
      setScanData(result);
    } catch (err) {
      setError('Failed to run WDF credit sizing scan. Please try again.');
      console.error('Plutus scan error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCredits = (credits) => {
    return typeof credits === 'number' ? credits.toLocaleString() : credits;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <header style={{
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          margin: '0 0 10px 0',
          fontWeight: '600'
        }}>Plutus WDF Credit Sizing</h1>
        <p style={{
          fontSize: '1.1rem',
          opacity: '0.9',
          margin: '0 0 30px 0'
        }}>Workflow Development Framework credit analysis and capability sizing</p>
        <button 
          style={{
            background: 'white',
            color: '#f59e0b',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            opacity: isLoading ? '0.7' : '1'
          }}
          onClick={runScan} 
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Run Credit Sizing Scan'}
        </button>
      </header>

      {isLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '60px 20px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderLeftColor: '#f59e0b',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '20px'
          }}></div>
          <p>Analyzing WDF capabilities and credit requirements...</p>
        </div>
      )}

      {error && (
        <div style={{
          background: '#fef2f2',
          color: '#dc2626',
          padding: '16px',
          margin: '20px',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {scanData && !isLoading && (
        <div style={{
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {scanData.status === 'stub' && (
            <div role="status" style={{
              background: '#fffbeb',
              color: '#92400e',
              padding: '16px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #fde68a'
            }}>
              {scanData.message || 'This scan is a placeholder; the figures below are not a real sizing.'}
            </div>
          )}

          {/* Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#374151', margin: '0 0 8px 0' }}>Capabilities Detected</h3>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#f59e0b'
              }}>
                {scanData.capabilities_detected || 0}
              </div>
            </div>
            
            <div style={{
              background: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#374151', margin: '0 0 8px 0' }}>Total Credits Required</h3>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#f59e0b'
              }}>
                {formatCredits(scanData.total_credits || 0)}
              </div>
            </div>
          </div>

          {/* Capability Table */}
          {scanData.lines && scanData.lines.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>WDF Capability Breakdown</h2>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  gap: '16px',
                  padding: '16px 20px',
                  background: '#f9fafb',
                  fontWeight: '600',
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <span>Capability</span>
                  <span>Detected</span>
                  <span>Usage Level</span>
                  <span>Credits</span>
                </div>
                {scanData.lines.map((line, index) => (
                  <div key={line.capability_id || index} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: '16px',
                    padding: '16px 20px',
                    borderBottom: index < scanData.lines.length - 1 ? '1px solid #f3f4f6' : 'none',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: '500', color: '#111827' }}>
                        {line.capability_label || 'Unknown Capability'}
                      </div>
                      {line.evidence && (
                        <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>
                          {line.evidence}
                        </div>
                      )}
                    </div>
                    <span style={{ textAlign: 'center' }}>
                      {line.detected ? (
                        <span style={{ color: '#10b981', fontSize: '1.2rem' }}>✓</span>
                      ) : (
                        <span style={{ color: '#6b7280', fontSize: '1.2rem' }}>—</span>
                      )}
                    </span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      textAlign: 'center'
                    }}>
                      {line.usage_value || 0} {line.meter_unit || 'units'}
                    </span>
                    <span style={{ fontWeight: '600', color: '#f59e0b', textAlign: 'right' }}>
                      {formatCredits(line.credits_consumed || 0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        @media (max-width: 768px) {
          .capability-table-header,
          .capability-table-row {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlutusApp />
  </React.StrictMode>
);