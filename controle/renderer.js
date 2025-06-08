import { configurarEntrada } from './renderer/entrada.js'
import { carregarFeiticos } from './renderer/feiticos.js'
import { exibirFeiticos } from './renderer/exibirFeiticos.js'
import {novoFeitico} from './renderer/novoFeitico.js'
import {carregarDiarios} from './renderer/diarios.js'
import {exibirDiarios} from './renderer/exibirDiarios.js'
import {clame} from './renderer/clame.js'
import {home} from './renderer/home.js'

//OBS: pensar naquele jeito de importar toda a pasta 
window.addEventListener('DOMContentLoaded', async () =>{
    await configurarEntrada()
    await carregarFeiticos()
    await exibirFeiticos()
    await novoFeitico()
    await carregarDiarios()
    await exibirDiarios()
    await clame()
    await home()


    const btnFechar=document.getElementById('fechar')
    if (btnFechar) btnFechar.addEventListener('click', ()=> window.api.fecharApp())

    const btnVoltar=document.getElementById('voltar')
    if(btnVoltar) btnVoltar.addEventListener('click', () => window.nav.voltar())

    const linkFeiticos=document.getElementById('link-feiticos')
    if (linkFeiticos) linkFeiticos.addEventListener('click', () => window.api.irParaPagina('feiticos.html'))

    const linkDiarios=document.getElementById('link-diarios')
    if(linkDiarios) linkDiarios.addEventListener('click', () => window.api.irParaPagina('diarios.html'))

    const linkClame = document.getElementById('link-clame')
    if(linkClame) linkClame.addEventListener('click', () => window.api.irParaPagina('clame.html'))

    const btnNovoFeitico=document.getElementById('novo-feitico')
    if(btnNovoFeitico) btnNovoFeitico.addEventListener('click', () => window.api.irParaPagina('novoFeitico.html'))

    const btnNovoDiario = document.getElementById('novo-diario')
    if (btnNovoDiario) btnNovoDiario.addEventListener('click', () => window.api.irParaPagina('novoDiario.html'))


    
})
