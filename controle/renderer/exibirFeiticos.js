export default async function exibirFeiticos(){
    if (!window.location.pathname.includes('exibirFeiticos.html')) return

    const params = new URLSearchParams(window.location.search)
    const nomeFeitico = params.get('feitico')
    const titulo = document.getElementById('titulo-feitico')
    const conteudo = document.getElementById('conteudo-feitico')
    const btnRegistrar = document.getElementById('registrar')

    if (titulo, conteudo){
            [titulo, conteudo].forEach(el => {
                if (el) {
                el.removeAttribute('readonly');
                el.removeAttribute('disabled');
                }
            })

        }

    if (nomeFeitico && titulo && conteudo){
        try {
            const texto = await window.api.lerFeitico(`${nomeFeitico}.txt`)
            titulo.value=nomeFeitico
            conteudo.value=texto
        } catch (erro){
            console.error(erro)
            conteudo.value='Erro ao carregar feitiço.'
        }
    }
        
    if (btnRegistrar){
        const novoBtn = btnRegistrar.cloneNode(true)
        btnRegistrar.replaceWith(novoBtn)
        novoBtn.addEventListener('click', async () =>{
            const novoTitulo = titulo.value.trim()
            const novoConteudo = conteudo.value

            if (!novoTitulo) {
                alert ("Novo título não pode ser vazio.")
                return
            }

            try {
                await window.api.salvarFeitico(
                    nomeFeitico? `${nomeFeitico}.txt`:`${novoTitulo}.txt`, 
                    novoTitulo, novoConteudo)
                alert ("Feitiço salvo!")
                if (!nomeFeitico){
                    window.api.irParaPagina('exibirFeiticos.html', {feitico: novoTitulo})
                }
            } catch (erro){
                alert ("Erro ao salvar feitiço.")
                console.error(erro)
            }
        })
    }
        
}