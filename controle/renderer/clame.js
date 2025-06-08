export async function clame(){

        const inputOracao = document.getElementById('clame-a-senhora-da-noite')
        const btnCanalizar = document.getElementById('canalizar')
        const respostaHecate = document.getElementById('resposta-hecate')

    if (inputOracao && btnCanalizar && respostaHecate) {
        btnCanalizar.addEventListener('click', async () =>{
            const oracao = inputOracao.value.trim()

            if (!oracao){
                respostaHecate.textContent="Escreva sua oração antes de canalizar."
                return
            }

            try {
                const res = await fetch('http://localhost:3001/responder-hecate',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({oracao})
                })
                const data = await res.json()
                respostaHecate.textContent=data.resposta
            } catch (error){
                console.error(error)
                respostaHecate.textContent="Não foi possível canalizar."
            }
        })
    } 
    }