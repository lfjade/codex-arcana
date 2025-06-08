export default async function configurarEntrada(){
    const path = window.location.pathname

    if(path.endsWith('entrada.html') || path ==='/' || path.endsWith('/')){
        const pwInput = document.getElementById('pw')
        if (!pwInput) return
        
        const expectedPw = await window.secure.getPw()
        let timeout

        pwInput.addEventListener('input', () =>{
            clearTimeout(timeout)
            
            timeout=setTimeout(() =>{
                if (pwInput.value === expectedPw){
                    window.location.href='home.html'
                }
        
            }, 500)

        })
    }
}