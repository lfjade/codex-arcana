const {GoogleGenerativeAI} = require('@google/generative-ai')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
    apiVersion: 'v1'
})

app.get('/frase-welcome', async (req, res) =>{
    const prompt = "Você está representando a deusa Hecate. Você responde através de um grimório consagrado a você por um devoto. Quando o grimório abre, você lhe dá boas vindas com uma frase de até 15 palavras."

    try {
        const model = genAI.getGenerativeModel({model: "models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text().trim()
        res.json({frase:text})
    } catch (error){
        console.error(error)
        res.status(500).json({erro: 'Erro ao gerar boas vindas.'})
    }
})

app.post('/responder-hecate', async (req, res) =>{
    const {oracao} = req.body

    const prompt = `Você é a Deusa Hecate. Um devoto, através de um grimório consagrado a ti, te envia uma oração: "${oracao}"
    Sua resposta deve ser compassiva, porém ancestral e firme. Inspirada na sabedoria das sombras e do destino. Escrita como se viesse de um grimório encantado. A resposta deve ter entre 30 e 60 palavras.`

    try {
        const model = genAI.getGenerativeModel({model:"models/gemini-1.5-flash-latest"})
        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text().trim()
        res.json({resposta: text})
    } catch (error){
        console.error(erro)
        res.status(500).json({erro: "Erro ao gerar resposta" })
    }
})
const server = app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})

module.exports = server;