// 导入 React 和必要的库
import React from 'react'; // React 核心库
import html2canvas from 'html2canvas'; // 用于将网页内容转换为 Canvas 图像
import { uploadScreenshot } from '../services/api'; // 导入自定义的 API 服务函数

// 定义 Screenshot 组件
const Screenshot: React.FC = () => {
  // 定义 handleCapture 函数，用于处理截图逻辑
  const handleCapture = async () => {
    console.log('Button clicked'); // 日志：确认按钮点击事件触发

    try {
      // 使用 html2canvas 截取整个页面的内容
      const canvas = await html2canvas(document.body);
      console.log('Screenshot captured'); // 日志：确认截图成功

      // 将 Canvas 转换为 Base64 格式的图片数据（PNG 格式）
      const image = canvas.toDataURL('image/png');

      // 调用 uploadScreenshot 函数，将图片数据发送到后端
      const response = await uploadScreenshot(image);

      // 打印后端返回的润色后的文本
      console.log('Polished Text:', response.polished_text);

      // 弹窗显示润色后的文本
      alert(`Polished Text: ${response.polished_text}`);
    } catch (error) {
      // 捕获并打印错误信息
      console.error('Error capturing screenshot:', error);
    }
  };

  // 返回组件的 JSX 结构
  return (
    <div>
      {/* 定义一个按钮，点击时触发 handleCapture 函数 */}
      <button
        onClick={handleCapture} // 绑定点击事件
        style={{ padding: '10px 20px', fontSize: '16px' }} // 设置按钮样式
      >
        Capture Screenshot {/* 按钮显示文本 */}
      </button>
    </div>
  );
};

// 导出 Screenshot 组件，供其他模块使用
export default Screenshot;