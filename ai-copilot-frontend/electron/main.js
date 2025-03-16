// 导入 Electron 的核心模块
const { app, BrowserWindow } = require('electron'); // app 用于管理应用程序的生命周期，BrowserWindow 用于创建和控制浏览器窗口
const path = require('path'); // path 模块用于处理文件路径

// 定义 createWindow 函数，用于创建应用窗口
function createWindow() {
  // 创建一个新的浏览器窗口
  const win = new BrowserWindow({
    width: 1200, // 窗口宽度
    height: 800, // 窗口高度
    webPreferences: {
      nodeIntegration: true, // 启用 Node.js 集成
      contextIsolation: false, // 禁用上下文隔离（允许在渲染进程中使用 Node.js API）
    },
  });

  // 判断当前运行环境
  if (process.env.NODE_ENV === 'development') {
    // 如果是开发环境，加载 Vite 开发服务器的 URL
    win.loadURL('http://localhost:5173');
  } else {
    // 如果是生产环境，加载打包后的静态文件
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

// 当 Electron 完成初始化并准备好创建窗口时，调用 createWindow 函数
app.whenReady().then(createWindow);

// 监听所有窗口关闭的事件
app.on('window-all-closed', () => {
  // 如果当前操作系统不是 macOS（darwin），则退出应用程序
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 监听应用程序激活事件（通常在 macOS 上点击 Dock 图标时触发）
app.on('activate', () => {
  // 如果没有打开的窗口，则创建一个新窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});