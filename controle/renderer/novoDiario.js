export default async function novoDiario(){
    if (!window.location.pathname.includes('novoDiario.html')) return

    const titulo = document.getElementById('titulo')
    const conteudo = document.getElementById('ritualistica')
    const btnRegistrar = document.getElementById('registrar')

    // colocar depois de registrar
    if (btnRegistrar){
        const novoBtn=btnRegistrar.cloneNode(true)
        btnRegistrar.replaceWith(novoBtn)
        novoBtn.addEventListener('click', async () =>{
            if (!titulo) alert ("Título não pode ser vazio.")
            if (!conteudo) alert ("Conteúdo não pode ser vazio")

            try {
                window.api.salvarDiario( titulo, conteudo)
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