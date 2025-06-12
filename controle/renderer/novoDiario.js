export default async function novoDiario(){
    if (!window.location.pathname.includes('novoDiario.html')) return
    const params = new URLSearchParams(window.location.search)
        const nomeArquivo = params.get('arquivo')
    
        if (!nomeArquivo){
            console.error('Nenhum arquivo especificado na URL.')
            return
        }

    try{
        const conteudo = await window.electron.invoke('ler-diario', nomeArquivo)

        if (conteudo.erro){
                console.error(conteudo.erro)
            } else {
                const titulo = nomeArquivo.replace(/\.txt$/, '')
                document.getElementById('titulo-diario').value = titulo
            }
    } catch (erro) {
        console.error('Erro inesperado: ', erro)
    }

}