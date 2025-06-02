window.addEventListener('DOMContentLoaded', async () =>{

    const pwInput = document.getElementById('pw')
    const expectedPw = await window.secure.getPw()
    let timeout

    if (pwInput){
        pwInput.addEventListener('input', () =>{
            clearTimeout(timeout)
            timeout=setTimeout(() =>{
                if (pwInput.value === expectedPw){
                    window.location.href='home.html'
                }

            }, 500)
        })
    }
    carregarFeiticos()
    carregarDiarios()
    const btnFechar = document.getElementById('fechar')
    if (btnFechar){
        btnFechar.addEventListener('click', () =>{
        window.api.fecharApp()
        })
    }
    const btnVoltar = document.getElementById('voltar')
    if (btnVoltar){
        btnVoltar.addEventListener('click', () =>{
        window.nav.voltar()
        })
    }
    
    const linkFeiticos = document.getElementById('link-feiticos')
    if (linkFeiticos){
        linkFeiticos.addEventListener('click', () =>{
        window.api.irParaPagina('feiticos.html')
        })
    }

    const linkDiarios = document.getElementById('link-diarios')
    if (linkDiarios){
        linkDiarios.addEventListener('click', () => {
            window.api.irParaPagina('diarios.html')
        } )
    }

    const btnNovoFeitico = document.getElementById('novo-feitico')
    if (btnNovoFeitico){
        btnNovoFeitico.addEventListener('click', () => {
            window.api.irParaPagina('novoFeitico.html')
        })
    }

    const btnNovoDiario = document.getElementById('novo-diario')
    if (btnNovoDiario){
        btnNovoDiario.addEventListener('click', () =>{
            window.api.irParaPagina('novoDiario.html')
        })
    }
    
})

async function abrirArquivo() {
    const content = await window.api.abrirArquivo()
    if (content.cancelado){
        console.log("Cancelado.")
    } else if (content.erro){
        console.error("Erro ao abrir o arquivo: ", content.erro)
    } else {
        document.getElementById('feitico').value=content
        document.getElementById('salvar-feitico').style.display='inline-block'
    }
}

async function abrirDiario(){
    const content = await window.api.abrirDiario()
    if (content.cancelado){
        console.log("cancelado")
    } else if (content.erro){
        console.error("Erro ao abrir o diário: ", content.erro)
    } else {
        document.getElementById('diario').value=content
        document.getElementById('salvar-diario').style.display='inline-block'
    }
}

async function salvarArquivo(){
    const content = document.getElementById('feitico').value
    const result = await window.api.salvarArquivo(content)

    if (result.cancelado){
        console.log("Salvamento cancelado.")
    } else if(result.erro) {
        console.error("Erro ao salvar: ", result.erro)
    } else {
        console.log("Arquivo salvo com sucesso!")
        document.getElementById('salvar-feitico').style.display = 'none'
    }
}



async function carregarFeiticos() {
    const listaDeFeiticos = document.getElementById('lista-de-feiticos')
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
        li.textContent = el.replace('.txt', '')
        listaDeFeiticos.appendChild(li)
    })  
   
}

async function carregarDiarios(){
    const listaDeDiarios = document.getElementById('lista-de-diarios')
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
        li.textContent = el.replace('.txt', '')
        listaDeDiarios.appendChild(li)
    })
}
