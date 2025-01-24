// AINewsReporter.tsx
import React from 'react';

const AINewsReporter = () => {
  return (
    <div className="min-h-screen pt-16">
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {/* Left Column: Chat Window */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h2>Chat Window</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #eee', padding: '5px', minHeight: '200px' }}>
            {/* Chat messages will go here */}
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '5px' }} />
            <button style={{ padding: '5px 10px', marginLeft: '5px' }}>Send</button>
          </div>
        </div>
      </div>

      {/* Right Column: Data Table */}
      <div style={{ border: '1px solid #ccc', padding: '10px' }}>
        <h2>Data Table</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Header 1</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Data 1</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Data 2</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Data 3</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Data 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AINewsReporter;
