const {contextBridge, ipcRenderer, ipcMain} = require('electron')
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('secure',{
    getPw: async () => await ipcRenderer.invoke('get-password')
})

contextBridge.exposeInMainWorld('api', {
    abrirArquivo: () => ipcRenderer.invoke('abrir-feitico'),
    salvarFeitico: (nomeAntigo, novoTitulo, conteudo) => ipcRenderer.invoke('salvar-feitico', nomeAntigo, novoTitulo, conteudo),
    salvarDiario: (nomeAntigo, novoTitulo, conteudo) => ipcRenderer.invoke('salvar-diario', nomeAntigo, novoTitulo, conteudo),
    abrirDiario: () =>ipcRenderer.invoke('abrir-diario'),
    listarFeiticos: () => ipcRenderer.invoke('listar-feiticos'),
    listarDiarios: () => ipcRenderer.invoke('listar-diarios'),
    excluirArquivo: (nome, tipo) => ipcRenderer.invoke('excluir-arquivo', nome, tipo),
    fecharApp: () => ipcRenderer.send('fechar'),
    irParaPagina: (pagina, queryParams = {}) => ipcRenderer.send('ir-para-pagina', pagina, queryParams),
    lerFeitico: (nomeArquivo) => ipcRenderer.invoke('ler-feitico', nomeArquivo),
    lerDiario: (nomeArquivo) => ipcRenderer.invoke('ler-diario', nomeArquivo)

})

contextBridge.exposeInMainWorld('nav', {
    voltar: () =>ipcRenderer.send('voltar-pagina')
})