export async function carregarDiarios(){
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