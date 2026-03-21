import React from 'react';
import ReactDOM from 'react-dom/client';
import { VirgilService } from './services/VirgilService.js';

function ChatApp() {
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  
  const service = React.useMemo(() => new VirgilService(), []);
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    // Initialize mermaid when component mounts
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({ 
        startOnLoad: false, 
        theme: 'default',
        securityLevel: 'loose'
      });
    }
  }, []);

  React.useEffect(() => {
    // Scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Process mermaid diagrams after messages update
    setTimeout(() => {
      if (typeof mermaid !== 'undefined') {
        mermaid.run({
          nodes: document.querySelectorAll('.mermaid:not([data-processed])')
        });
      }
    }, 100);
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage = { type: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    try {
      const response = await service.askVirgil(query);
      
      // Handle the new response structure
      let content = '';
      if (response.analysis) {
        content = response.analysis;
      }
      
      if (response.recommendations && response.recommendations.length > 0) {
        if (content) content += '\n\n**Recommendations:**\n';
        response.recommendations.forEach((rec, index) => {
          content += `${index + 1}. **${rec.title || rec}** (${rec.priority || ''})\n   ${rec.description
            || ''}\n\n`;
        });
      }
      
      if (response.mermaid_diagram) {
        content += '\n\n**Architecture Diagram:**\n```mermaid\n' + response.mermaid_diagram + '\n```';
      }
      
      const aiMessage = { 
        type: 'ai', 
        content: content || 'I received your message but couldn\'t generate a response. Please try rephrasing your question.',
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { 
        type: 'ai', 
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (content) => {
    if (typeof marked === 'undefined') {
      // Fallback to simple formatting if marked is not available
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```mermaid\n(.*?)\n```/gs, '<pre class="mermaid">$1</pre>')
        .replace(/```\n(.*?)\n```/gs, '<pre><code>$1</code></pre>')
        .replace(/\n/g, '<br>');
    }

    // Use marked for proper markdown parsing
    let html = marked.parse(content);
    
    // Convert mermaid code blocks to mermaid elements
    html = html.replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      '<pre class="mermaid">$1</pre>'
    );
    
    return html;
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#f8fafc',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        flexShrink: 0
      }}>
        <h1 style={{
          fontSize: '2rem',
          margin: '0 0 8px 0',
          fontWeight: '600'
        }}>Virgil Chat</h1>
        <p style={{
          margin: '0',
          opacity: '0.9'
        }}>AI-powered ServiceNow architecture and pricing guidance</p>
      </header>

      {/* Chat Container */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        padding: '0 20px',
        overflow: 'hidden'
      }}>
        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {messages.length === 0 && (
            <div style={{
              textAlign: 'center',
              color: '#6b7280',
              padding: '40px 20px'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🤖</div>
              <h3 style={{ margin: '0 0 8px 0' }}>Welcome to Virgil Chat</h3>
              <p style={{ margin: '0' }}>Ask me anything about ServiceNow architecture, pricing, or best practices!</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '18px',
                background: message.type === 'user' ? '#8b5cf6' : 'white',
                color: message.type === 'user' ? 'white' : '#374151',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                border: message.isError ? '1px solid #f87171' : 'none'
              }}>
                <div 
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                  className="message-content"
                />
                <div style={{
                  fontSize: '0.75rem',
                  opacity: '0.7',
                  marginTop: '8px'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '18px',
                background: 'white',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#8b5cf6',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite ease-in-out'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#8b5cf6',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite ease-in-out',
                    animationDelay: '0.2s'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#8b5cf6',
                    borderRadius: '50%',
                    animation: 'typing 1.4s infinite ease-in-out',
                    animationDelay: '0.4s'
                  }}></div>
                </div>
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Virgil is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '20px 0',
          borderTop: '1px solid #e5e7eb',
          background: '#f8fafc',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-end'
          }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Virgil about ServiceNow architecture, pricing, or best practices..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '24px',
                border: '1px solid #d1d5db',
                resize: 'none',
                fontFamily: 'inherit',
                fontSize: '1rem',
                outline: 'none',
                minHeight: '48px',
                maxHeight: '120px'
              }}
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                padding: '12px 20px',
                background: inputValue.trim() && !isTyping ? '#8b5cf6' : '#d1d5db',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: '500',
                minWidth: '80px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }
        
        .message-content h1, .message-content h2, .message-content h3, 
        .message-content h4, .message-content h5, .message-content h6 {
          margin: 0.5rem 0;
          color: inherit;
        }
        
        .message-content h2 {
          font-size: 1.2rem;
          font-weight: 600;
        }
        
        .message-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .message-content p {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        
        .message-content ul, .message-content ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        
        .message-content li {
          margin: 0.25rem 0;
        }
        
        .message-content code {
          background: #f3f4f6;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }
        
        .message-content pre {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 0.5rem 0;
        }
        
        .message-content pre code {
          background: transparent;
          padding: 0;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }
        
        .message-content .mermaid {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 0.5rem 0;
          font-family: 'Courier New', monospace;
          text-align: center;
        }
        
        .message-content strong {
          font-weight: 600;
        }
        
        .message-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChatApp />
  </React.StrictMode>
);