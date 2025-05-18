const {contextBridge, ipcRenderer} = require('electron')
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('secure',{
    getPw: async () => await ipcRenderer.invoke('get-password')
})