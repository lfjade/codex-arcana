export default async function novoFeitico(){
    if (!window.location.pathname.includes('novoFeitico.html')) return
    
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
            if (!conteudoValor) alert ("Conteúdo não pode ser vazio.")

            try {
                window.api.salvarFeitico(null, tituloValor, conteudoValor)
                alert ("Feitiço salvo!")
            } catch (erro){
                alert ("Erro ao salvar feitiço.")
                console.error(erro)
            }
        })
    }
}