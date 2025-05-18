window.addEventListener('DOMContentLoaded', () =>{
    // const versoes = document.getElementById('placeholder')
    // versoes.innerText = `Este aplicativo está usando Node (v.${versions.node()}) e Electron (v. ${versions.electron()}).`

    const pwInput = document.getElementById('pw')

    pwInput.addEventListener('keydown', async function(event){
        if (event.key==='Enter'){
            const expectedPW = await window.secure.getPw()
            if (pwInput.value === expectedPW){
                 window.location.href = 'grimorio.html'
            }
        }
    })

})