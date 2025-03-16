import React from 'react';
import html2canvas from 'html2canvas';
import { uploadScreenshot } from '../services/api';

const Screenshot: React.FC = () => {
  const handleCapture = async () => {
    try {
      const canvas = await html2canvas(document.body);
      const image = canvas.toDataURL('image/png');
      const response = await uploadScreenshot(image);
      console.log('Polished Text:', response.polished_text);
      alert(`Polished Text: ${response.polished_text}`);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCapture} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Capture Screenshot
      </button>
    </div>
  );
};

export default Screenshot;