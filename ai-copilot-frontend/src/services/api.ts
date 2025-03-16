import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const uploadScreenshot = async (image: string) => {
  const response = await axios.post(`${API_BASE_URL}/api/upload-screenshot`, { image });
  return response.data;
};