const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

async function createMainWindow(){
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    await mainWindow.loadFile('index.html')
}

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})