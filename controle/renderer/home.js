export default async function home(){
    const fraseWelcome = document.getElementById('frase-welcome')
        if (fraseWelcome){
            fetch('http://localhost:3001/frase-welcome')
            .then(res=> res.json())
            .then(data =>{
                if (fraseWelcome){
                fraseWelcome.textContent = data.frase
                }
            })
            .catch(erro =>{
                console.error(erro)
                document.getElementById('frase-welcome').textContent = "Canalização falhou"
            })

        }
}