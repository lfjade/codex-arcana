export async function carregarFeiticos() {
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
