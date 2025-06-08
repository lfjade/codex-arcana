export default async function exibirDiarios(){
    
        const params = new URLSearchParams(window.location.search)
        const nomeDiario = params.get('diario')

        const titulo = document.getElementById('titulo-diario')
        const conteudo = document.getElementById('conteudo-diario')
        const btnRegistrar = document.getElementById('registrar')

        if (nomeDiario){
            try{
                const texto = await window.api.lerDiario(`${nomeDiario}.txt`)
                if (titulo) titulo.value=nomeDiario
                if (conteudo) conteudo.textcontent=texto
            } catch (erro){
                if (conteudo) conteudo.textContent = 'Erro ao carregar diário.'
                console.error(erro)
            }
        }

        if (btnRegistrar){
            btnRegistrar.addEventListener('click', async() =>{
                const novoTitulo = titulo.value.trim()
                const novoConteudo = conteudo.value

                if (!novoTitulo) {
                    alert ("Novo título não pode ser vazio.")
                    return
                }

                try {
                    await window.api.salvarDiario(`${novoTitulo}.txt`, novoConteudo)
                    alert ("Diário salvo!")
                    if (!nomeDiario){
                        window.location.href=`exibirDiarios.html?diario=${encodeURIComponent(novoTitulo)}`
                    }
                } catch (erro){
                    alert ("Erro ao salvar diário.")
                    console.error(erro)
                }
            })
        }
}