const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const {pathToFileURL} = require('url')
const fs = require('fs')
require('dotenv').config({ path: __dirname + '/.env' })

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

    ipcMain.on('ir-para-pagina', (event, pagina, queryParams= {})=>{
    if (mainWindow && pagina){
        let caminhoAbsoluto = path.join(__dirname, '..', 'apresentacao', pagina)
        let urlFinal = pathToFileURL(caminhoAbsoluto).href

        const searchParams = new URLSearchParams(queryParams).toString()

        if (searchParams){
            urlFinal+=`?${searchParams}`
        }
        mainWindow.loadURL(urlFinal)
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

ipcMain.handle('salvar-feitico', async (_, nomeArquivoAntigo, novoTitulo, novoConteudo) =>{
    try {
        const novoNomeArquivo=`${novoTitulo}.txt`
        const caminhoAntigo = path.join(pastaFeiticos, nomeArquivoAntigo)
        const caminhoNovo = path.join(pastaFeiticos, novoNomeArquivo)

        if (nomeArquivoAntigo !== novoNomeArquivo){
            fs.renameSync(caminhoAntigo, caminhoNovo)
        }

        fs.writeFileSync(caminhoNovo, novoConteudo, 'utf-8')
        return {sucesso:true}
    } catch (erro){
        return {erro:erro.message}
    }
})

ipcMain.handle('salvar-diario', async(_, nomeArquivoAntigo, novoTitulo, novoConteudo)=>{
    try {
        const novoNomeArquivo=`${novoTitulo}.txt`
        const caminhoAntigo = path.join(pastaDiarios, nomeArquivoAntigo)
        const caminhoNovo = path.join(pastaDiarios, novoNomeArquivo)

        if (nomeArquivoAntigo!==novoNomeArquivo){
            fs.renameSync(caminhoAntigo, caminhoNovo)
        }

        fs.writeFileSync(caminhoNovo, novoConteudo, 'utf-8')
        return {sucesso:true}
    } catch (erro){
        return {erro:erro.message}
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