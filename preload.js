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
    salvarArquivo: (content) => ipcRenderer.invoke('salvar-feitico', content),
    abrirDiario: () =>ipcRenderer.invoke('abrir-diario'),
    salvarDiario: (content) => ipcRenderer.invoke('salvar-diario', content),
    listarFeiticos: () => ipcRenderer.invoke('listar-feiticos'),
    listarDiarios: () => ipcRenderer.invoke('listar-diarios'),
    fecharApp: () => ipcRenderer.send('fechar'),
    irParaPagina: (pagina) => ipcRenderer.send('ir-para-pagina', pagina)

})

contextBridge.exposeInMainWorld('nav', {
    voltar: () =>ipcRenderer.send('voltar-pagina')
})