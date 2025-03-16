import React from 'react';
import Screenshot from './components/Screenshot';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Code Interview Copilot</h1>
      <Screenshot />
    </div>
  );
};

export default App;