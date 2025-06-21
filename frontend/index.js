const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Voice Controlled OS',
    width: 1500,
    height: 800,
  });

  mainWindow.webContents.openDevTools();

//   const startUrl = url.format({
//     pathname: path.join(__dirname, './app/build/index.html'),
//     protocol: 'file',
//   });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(createMainWindow);