import configurarEntrada from './renderer/entrada.js'
import carregarFeiticos from './renderer/feiticos.js'
import exibirFeiticos from './renderer/exibirFeiticos.js'
import novoFeitico from './renderer/novoFeitico.js'
import carregarDiarios from './renderer/diarios.js'
import exibirDiarios from './renderer/exibirDiarios.js'
import novoDiario from './renderer/novoDiario.js'
import clame from './renderer/clame.js'
import home from './renderer/home.js'
import navegacao from './renderer/navegacao.js'

const modulos = [
    configurarEntrada,
    carregarFeiticos,
    exibirFeiticos,
    novoFeitico,
    carregarDiarios,
    exibirDiarios,
    novoDiario,
    clame,
    home,
    navegacao,
]

//OBS: pensar naquele jeito de importar toda a pasta 
window.addEventListener('DOMContentLoaded', async () =>{
    for (const modulo of modulos){
        await modulo()
    }

    navegacao()
    
})
