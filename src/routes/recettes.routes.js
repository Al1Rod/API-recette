import { Router } from 'express'
import { chercherRecettes } from '../services/mealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    let recettes = await chercherRecettes(req.query.nom || '')

    if (req.query.categorie) {
        recettes = recettes.filter((recette) => recette.categorie === req.query.categorie)
    }
    if (req.query.origine) {
        recettes = recettes.filter((recette) => recette.origine === req.query.origine)
    }

    res.json(recettes)
})

export default router
