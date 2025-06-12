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


    // const params = new URLSearchParams(window.location.search)
    //     const nomeArquivo = params.get('arquivo')
    
    //     if (!nomeArquivo){
    //         console.error('Nenhum arquivo especificado na URL.')
    //         return
    //     }

    // try{
    //     const conteudo = await window.electron.invoke('ler-diario', nomeArquivo)

    //     if (conteudo.erro){
    //             console.error(conteudo.erro)
    //         } else {
    //             const titulo = nomeArquivo.replace(/\.txt$/, '')
    //             document.getElementById('titulo-diario').value = titulo
    //         }
    // } catch (erro) {
    //     console.error('Erro inesperado: ', erro)
    // }

}