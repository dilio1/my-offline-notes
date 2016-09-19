const {app, BrowserWindow, globalShortcut} = require('electron')

let win, db

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600, toolbar: false})
  win.loadURL(`file://${__dirname}/index.html`)
  // win.webContents.openDevTools()

  globalShortcut.register('ctrl+d', function () {
            win.webContents.send('global-shortcut', 0);
    });

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})