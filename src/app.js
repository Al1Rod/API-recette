import express from 'express'
import cors from 'cors'
import recettesRoute from './routes/recettes.routes.js'

const app = express()
app.use(cors())

app.get('/health', (req, res) => {
    res.json({ version: '1.0.0' })
})

app.use('/api/recettes', recettesRoute)


app.use((req, res) => {
    res.status(404).json({ erreur: 'page inconnue' })
})


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ erreur: 'erreur serveur' })
})

export default app
