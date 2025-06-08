import { configurarEntrada } from './renderer/entrada.js'

//OBS: pensar naquele jeito de importar toda a pasta 
window.addEventListener('DOMContentLoaded', async () =>{
    await configurarEntrada()
const path = window.location.pathname;
    // config home
    if (path.endsWith('home.html')){
        const fraseWelcome = document.getElementById('frase-welcome')
        if (fraseWelcome){
            fetch('http://localhost:3001/frase-welcome')
            .then(res=> res.json())
            .then(data =>{
                if (fraseWelcome){
                fraseWelcome.textContent = data.frase
                }
            })
            .catch(erro =>{
                console.error(erro)
                document.getElementById('frase-welcome').textContent = "Canalização falhou"
            })

        }
    }

    carregarFeiticos()
    carregarDiarios()

    //config navegação

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

    //config feiticos.html

    if (path.endsWith('feiticos.html')){
        carregarFeiticos()
    }

    //config diarios.html
    if(path.endsWith('diarios.html')){
        carregarDiarios()
    }
    
    // config clame.html
    
    if (path.endsWith('clame.html')){
        const inputOracao = document.getElementById('clame-a-senhora-da-noite')
        const btnCanalizar = document.getElementById('canalizar')
        const respostaHecate = document.getElementById('resposta-hecate')
        // const paginas = document.querySelectorAll('.pagina')

    if (inputOracao && btnCanalizar && respostaHecate) {
        btnCanalizar.addEventListener('click', async () =>{
            const oracao = inputOracao.value.trim()

            if (!oracao){
                respostaHecate.textContent="Escreva sua oração antes de canalizar."
                return
            }

            try {
                const res = await fetch('http://localhost:3001/responder-hecate',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({oracao})
                })
                const data = await res.json()
                respostaHecate.textContent=data.resposta
            } catch (error){
                console.error(error)
                respostaHecate.textContent="Não foi possível canalizar."
            }
        })
    } 
    }

    
    if (window.location.pathname.includes('exibirFeiticos.html')){
        const params = new URLSearchParams(window.location.search)
        const nomeFeitico = params.get('feitico')

        const titulo = document.getElementById('titulo-feitico')
        const conteudo = document.getElementById('conteudo-feitico')

        if (nomeFeitico){
            try {
                const texto = await window.api.lerFeitico(`${nomeFeitico}.txt`)
                titulo.textContent=nomeFeitico
                conteudo.textContent = texto
            } catch (erro){
                conteudo.textContent = 'Erro ao carregar feitiço.'
                console.error(erro)
            }
        } else {
            conteudo.textContent = 'Feitiço não especificado.'
        }
    }

    if (path.endsWith('exibirDiarios.html')){
        const params = new URLSearchParams(window.location.search)
        const nomeDiario = params.get('diario')

        const titulo = document.getElementById('titulo-diario')
        const conteudo = document.getElementById('conteudo-diario')

        if (nomeDiario){
            try{
                const texto = await window.api.lerDiario(`${nomeDiario}.txt`)
                if (titulo) titulo.textContent=nomeDiario
                if (conteudo) conteudo.textContent=texto
            } catch (erro){
                if (conteudo) conteudo.textContent = 'Erro ao carregar diário.'
                console.error(erro)
            } 
        } else {
            if (conteudo) conteudo.textContent = 'Diário não especificado.'
        }
    }

    if (path.endsWith('novoFeitico.html')){

        const params = new URLSearchParams(window.location.search)
        const nomeArquivo = params.get('arquivo')
    
        if (!nomeArquivo){
            console.error('Nenhum arquivo especificado na URL.')
            return
        }
    
        try {
            const conteudo = await window.electron.invoke('ler-feitico', nomeArquivo)
    
            if (conteudo.erro){
                console.error(conteudo.erro)
            } else {
                const titulo = nomeArquivo.replace(/\.txt$/, '')
                document.getElementById('titulo-feitico').value = titulo
            }
        } catch (erro){
            console.error('Erro inesperado: ', erro)
        }
    }

    const btnRegistrar = document.getElementById('registrar')
    if (btnRegistrar){
        addEventListener('click', async () =>{
        const novoTitulo = document.getElementById('titulo').value
        const novoConteudo = document.getElementById('conteudo-feitico').value
        })
        if (resultado.sucesso) {
            alert('oba')
        } else {
            alert ('putz')
        }
    }
    
    
})



async function carregarFeiticos() {
    const listaDeFeiticos = document.getElementById('lista-de-feiticos')
    if (!listaDeFeiticos) return
    const arquivos = await window.api.listarFeiticos()
    if (arquivos.erro){
        listaDeFeiticos.innerHTML = `<li>Erro: ${arquivos.erro}</li>`
        return
    }

    if (arquivos.length === 0){
        listaDeFeiticos.innerHTML=`<li>Nenhum feitiço encontrado.</li>`
        return
    }
    listaDeFeiticos.innerHTML=''

    arquivos.forEach(el => {
        const li = document.createElement('li')
        const nomeFeitico = el.replace('.txt', '')
        const link = document.createElement('a')

        link.textContent=nomeFeitico
        link.href=`exibirFeiticos.html?feitico=${encodeURIComponent(nomeFeitico)}`
        link.style.textDecoration='none'

        li.appendChild(link)
        listaDeFeiticos.appendChild(li)
    })  
   
}

async function carregarDiarios(){
    const listaDeDiarios = document.getElementById('lista-de-diarios')
    if (!listaDeDiarios) return

    const arquivos = await window.api.listarDiarios()
    if (arquivos.erro){
        listaDeDiarios.innerHTML= `<li>Erro: ${arquivos.erro}</li>`
    }
    if (arquivos.length === 0){
        listaDeDiarios.innerHTML=`<li>Nenhum diário encontrado.</li>`
    }
    listaDeDiarios.innerHTML = ''

    arquivos.forEach(el => {
        const li = document.createElement('li')
        const nomeDiario = el.replace('.txt', '')
        const link = document.createElement('a')

        link.textContent=nomeDiario
        link.href=`exibirDiarios.html?diario=${encodeURIComponent(nomeDiario)}`
        link.style.textDecoration='none'

        li.appendChild(link)
        listaDeDiarios.appendChild(li)
    })
}
