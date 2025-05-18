window.addEventListener('DOMContentLoaded', () =>{

    const pwInput = document.getElementById('pw')
    if (pwInput){
        pwInput.addEventListener('keydown', async function(event){
            if (event.key==='Enter'){
                const expectedPW = await window.secure.getPw()
                if (pwInput.value === expectedPW){
                    window.location.href = 'grimorio.html'
                }
            }
        })
    }
    carregarFeiticos()
    
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
    });
}