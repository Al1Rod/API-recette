import { Router } from 'express'
import { chercherRecettes, chercherUneRecette } from '../services/mealdb.service.js'

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

router.get('/:id', async (req, res) => {
    const recette = await chercherUneRecette(req.params.id)

    if (recette === null) {
        return res.status(404).json({ erreur: 'recette introuvable' })
    }

    res.json(recette)
})

export default router
