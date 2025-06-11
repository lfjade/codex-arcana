export default async function exibirDiarios(){
        if (!window.location.pathname.includes('exibirDiarios.html')) return

        const params = new URLSearchParams(window.location.search)
        const nomeDiario = params.get('diario')
        const titulo = document.getElementById('titulo-diario')
        const conteudo = document.getElementById('conteudo-diario')
        const btnRegistrar = document.getElementById('registrar')
        const btnExcluir = document.getElementById('excluir-diario')

        if (titulo, conteudo){
            [titulo, conteudo].forEach(el => {
                if (el) {
                el.removeAttribute('readonly');
                el.removeAttribute('disabled');
                }
            })

        }


        if (nomeDiario && titulo && conteudo){
            try{
                const texto = await window.api.lerDiario(`${nomeDiario}.txt`)
                itulo.value=nomeDiario
                conteudo.value=texto
            } catch (erro){
                conteudo.value = 'Erro ao carregar diário.'
                console.error(erro)
            }
        }

        if (btnRegistrar){
            const novoBtn = btnRegistrar.cloneNode(true)
            btnRegistrar.replaceWith(novoBtn)
            novoBtn.addEventListener('click', async() =>{
                const novoTitulo = titulo.value.trim()
                const novoConteudo = conteudo.value

                if (!novoTitulo) {
                    alert ("Novo título não pode ser vazio.")
                    return
                }

                try {
                    await window.api.salvarDiario(
                        nomeDiario? `${nomeDiario}.txt` : `${novoTitulo}.txt`,
                        novoTitulo, novoConteudo)
                    alert ("Diário salvo!")
                    if (!nomeDiario){
                        window.api.irParaPagina('exibirDiarios.html', {diario: novoTitulo})
                    }
                } catch (erro){
                    alert ("Erro ao salvar diário.")
                    console.error(erro)
                }
            })
        }

        if (btnExcluir) {
            btnExcluir.addEventListener('click', async () =>{
                const nomeDiario = new URLSearchParams(window.location.search).get('diario')

                if (confirm(`Tem certeza que deseja excluir o diário "${nomeDiario}"? `)){
                    const resultado = await window.api.excluirArquivo(`${nomeDiario}.txt`, 'diario')
                    if (resultado.sucesso){
                        alert("Diário excluído.")
                        window.api.irParaPagina('diarios.html')
                    } else {
                        alert(`Erro ao excluir diário: ${resultado.erro}`)
                    }
                }
            })
        }
}