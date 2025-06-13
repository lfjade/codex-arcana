export default async function novoDiario(){
    if (!window.location.pathname.includes('novoDiario.html')) return

    const titulo = document.getElementById('titulo')
    const conteudo = document.getElementById('ritualistica')
    const btnRegistrar = document.getElementById('registrar')


    if (btnRegistrar){
        const novoBtn=btnRegistrar.cloneNode(true)
        btnRegistrar.replaceWith(novoBtn)
        novoBtn.addEventListener('click', async () =>{
            const tituloValor = titulo?.value?.trim()
            const conteudoValor = conteudo?.value?.trim() || conteudo?.textContent?.trim()
            if (!tituloValor) alert ("Título não pode ser vazio.")
            if (!conteudoValor) alert ("Conteúdo não pode ser vazio")

            try {
                window.api.salvarDiario(null, tituloValor, conteudoValor)
                alert("Diário salvo!")
            } catch (erro){
                alert("Erro ao salvar diário.")
                console.error(erro)
            }
        })
    }
}