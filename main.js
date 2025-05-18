const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs')
require('dotenv').config()


async function createMainWindow(){
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            additionalArguments: [`--PW=${process.env.PW}`]
        }
    })
    await mainWindow.loadFile('index.html')

    
}

ipcMain.handle('get-password', () => {
    return process.env.PW
})

app.whenReady().then(createMainWindow)

ipcMain.handle('abrir-arquivo', async () =>{
    try {
        const result = await dialog.showOpenDialog({
            filters: [{name: 'Arquivos', extensions: ['txt', 'json']}],
            properties: ['openFile']

        })

        if (result.canceled) return {cancelado:true}

        const caminho = result.filePaths[0]
        const conteudo = fs.readFileSync(caminho, 'utf-8')
        return conteudo
    } catch (erro){
        return {erro: erro.message}
    }
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})