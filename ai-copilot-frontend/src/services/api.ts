// 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';

// 定义后端 API 的基础 URL
const API_BASE_URL = 'http://localhost:8000';

// 定义 uploadScreenshot 函数，用于将截图上传到后端
export const uploadScreenshot = async (image: string) => {
  // 使用 axios 发送 POST 请求到后端的 /api/upload-screenshot 接口
  const response = await axios.post(`${API_BASE_URL}/api/upload-screenshot`, {
    image, // 将 Base64 格式的图片数据作为请求体发送
  });

  // 返回后端响应的数据
  return response.data;
};