export default async function exibirDiarios(){
    const params = new URLSearchParams(window.location.search)
        const nomeDiario = params.get('diario')

        const titulo = document.getElementById('titulo-diario')
        const conteudo = document.getElementById('conteudo-diario')

        if (nomeDiario){
            try{
                const texto = await window.api.lerDiario(`${nomeDiario}.txt`)
                if (titulo) titulo.textContent=nomeDiario
                if (conteudo) conteudo.textContent=texto
            } catch (erro){
                if (conteudo) conteudo.textContent = 'Erro ao carregar diário.'
                console.error(erro)
            } 
        } else {
            if (conteudo) conteudo.textContent = 'Diário não especificado.'
        }
}