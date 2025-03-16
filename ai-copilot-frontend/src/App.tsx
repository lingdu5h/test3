// 导入 React 核心库
import React from 'react';

// 导入 Screenshot 组件
import Screenshot from './components/Screenshot';

// 定义 App 组件
const App: React.FC = () => {
  return (
    // 设置外层容器的样式
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* 标题 */}
      <h1>AI Code Interview Copilot</h1>

      {/* 渲染 Screenshot 组件 */}
      <Screenshot />
    </div>
  );
};

// 导出 App 组件，供其他模块使用
export default App;