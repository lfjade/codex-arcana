const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const fs = require('fs')
require('dotenv').config({ path: __dirname + '/.env' })
console.log('Senha carregada do .env:', process.env.PW);

async function createMainWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '..', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            additionalArguments: [`--PW=${process.env.PW}`]
        }
    })
    await mainWindow.loadFile(path.join(__dirname, '../apresentacao/entrada.html'))
    server = require('./gemini.js')

    ipcMain.on('ir-para-pagina', (event, pagina)=>{
    if (mainWindow && pagina){
        const caminhoAbsoluto = path.join(__dirname, '..', 'apresentacao', pagina)
        mainWindow.loadFile(caminhoAbsoluto)
    }

})

ipcMain.on('voltar-pagina', () =>{
    const janela = BrowserWindow.getFocusedWindow()
    if (janela && janela.webContents.navigationHistory.canGoBack()){
        janela.webContents.navigationHistory.goBack()
    }
})
    
}

ipcMain.handle('invocar-hecate', async (event, oracao) =>{
    const resposta = gerarRespostaDaSenhoraDaNoite(oracao)
    return resposta
})

ipcMain.handle('get-password', () => {
    return process.env.PW
})

app.whenReady().then(createMainWindow)

ipcMain.handle('abrir-feitico', async () =>{
    try {
        const result = await dialog.showOpenDialog({
            filters: [{name: 'Arquivos', extensions: ['txt']}],
            properties: ['openFile']

        })

        if (result.canceled || result.filePaths.length===0) return {cancelado:true}

        const caminho = result.filePaths[0]
        const conteudo = fs.readFileSync(caminho, 'utf-8')
        return conteudo
    } catch (erro){
        return {erro: erro.message}
    }
})

ipcMain.handle('abrir-diario', async () =>{
    try {
        const result = await dialog.showOpenDialog({
            filters: [{name:'Diários', extensions: ['txt']}],
            properties: ['openFile']
        })

        if (result.canceled || result.filePaths.length===0) return {cancelado:true}

        const caminho = result.filePaths[0]
        const conteudo = fs.readFileSync(caminho, 'utf8')
        return conteudo
    } catch (erro){
        return {erro: erro.message}
    }
})

ipcMain.handle('salvar-feitico', async (_, content) => {
    try {
        const result = await dialog.showOpenDialog({
            filters: [{name: 'Arquivos', extensions:['txt']}],
            defaultPath: 'feitico.txt'
        })
        if (result.canceled) return {cancelado: true}
        fs.writeFileSync(result.filePath, content, 'utf-8')
        return {sucesso:true}
    } catch (erro){
        return {erro: erro.message}
    }
})

ipcMain.handle('salvar-diario', async (_, content) =>{
    try {
        const result = await dialog.showOpenDialog({
            filters: [{name: 'Diários', extensions:['txt']}],
            defaultPath: 'diario.txt'
        })
        if (result.canceled) return {cancelado:true}
        fs.writeFileSync(result.filePath, content, 'utf-8')
        return {sucesso:true}
    } catch(erro) {
        return {erro: erro.message}
    }
})

const pastaFeiticos = path.join(__dirname, '..', 'apresentacao', 'feiticos')
const pastaDiarios = path.join(__dirname, '..', 'apresentacao', 'diarios')

ipcMain.handle('listar-feiticos', async () => {
    try {
        const arquivos = fs.readdirSync(pastaFeiticos).filter(nome => nome.endsWith('.txt'))
        return arquivos
    } catch (erro){
        return {erro: erro.message}
    }
})

ipcMain.handle('listar-diarios', async () =>{
    try {
        const arquivos = fs.readdirSync(pastaDiarios).filter(nome => nome.endsWith('.txt'))
        return arquivos
    } catch (erro){
        return{erro: erro.message}
    }
})

ipcMain.handle('ler-feitico', async (_, nomeArquivo) =>{
    try {
        if (!/^[\w\- ]+\.txt$/.test(nomeArquivo)) {
            throw new Error('Nome de arquivo inválido.')
        }

        const caminhoCompleto = path.join(pastaFeiticos, nomeArquivo)

        if (!fs.existsSync(caminhoCompleto)){
            throw new Error('Arquivo não encontrado.')
        }

        const conteudo = fs.readFileSync(caminhoCompleto, 'utf-8')
        return conteudo
    } catch (erro){
        return {erro: erro.message}
    }
})

ipcMain.handle('ler-diario', async (_, nomeArquivo) => {
    try {
        if (!/^[\w\- ]+\.txt$/.test(nomeArquivo)){
            throw new Error ('Nome de arquivo inválido.')
        }

        const caminhoCompleto = path.join(pastaDiarios, nomeArquivo)

        if (!fs.existsSync(caminhoCompleto)){
            throw new Error('Arquivo não encontrado.')
        }
        const conteudo = fs.readFileSync(caminhoCompleto, 'utf-8')
        return conteudo
    } catch (erro){
        return {erro: erro.message}
    }
})



ipcMain.on('fechar', () =>{
    app.quit()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})