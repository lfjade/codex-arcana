export default async function exibirFeiticos(){
    
        const params = new URLSearchParams(window.location.search)
        const nomeFeitico = params.get('feitico')

        const titulo = document.getElementById('titulo-feitico')
        const conteudo = document.getElementById('conteudo-feitico')
        const btnRegistrar = document.getElementById('registrar')

        if (nomeFeitico){
            try {
                const texto = await window.api.lerFeitico(`${nomeFeitico}.txt`)
                if (titulo) titulo.value=nomeFeitico
                if (conteudo) conteudo.textContent = texto
            } catch (erro){
                if (conteudo) conteudo.textContent = 'Erro ao carregar feitiço.'
                console.error(erro)
            }
        }
            
        if (btnRegistrar){
            btnRegistrar.addEventListener('click', async () =>{
                const novoTitulo = titulo.value.trim()
                const novoConteudo = conteudo.value

                if (!novoTitulo) {
                    alert ("Novo título não pode ser vazio.")
                    return
                }

                try {
                    await window.api.salvarFeitico(`${novoTitulo}.txt`, novoConteudo)
                    alert ("Feitiço salvo!")
                    if (!nomeFeitico){
                        window.location.href=`exibirFeiticos.html?feitico=${encodeURIComponent(novoTitulo)}`
                    }
                } catch (erro){
                    alert ("Erro ao salvar feitiço.")
                    console.error(erro)
                }
            })
        }
        
}