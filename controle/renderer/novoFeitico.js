export default async function novoFeitico(){

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