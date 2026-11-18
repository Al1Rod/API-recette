import { Router } from 'express'
import { chercherRecettes } from '../services/mealdb.service.js'

const router = Router()

router.get('/', async (req, res) => {
    const recettes = await chercherRecettes(req.query.nom || '')

    const parCategorie = {}
    const parOrigine = {}
    const parIngredient = {}
    let totalIngredients = 0
    let recetteLaPlusLongue = null

    for (const recette of recettes) {
        const categorie = recette.categorie || 'Inconnue'
        const origine = recette.origine || 'Inconnue'

        if (parCategorie[categorie]) {
            parCategorie[categorie] = parCategorie[categorie] + 1
        } else {
            parCategorie[categorie] = 1
        }

        if (parOrigine[origine]) {
            parOrigine[origine] = parOrigine[origine] + 1
        } else {
            parOrigine[origine] = 1
        }

        for (const ingredient of recette.ingredients) {
            const nom = ingredient.nom.toLowerCase()
            if (parIngredient[nom]) {
                parIngredient[nom] = parIngredient[nom] + 1
            } else {
                parIngredient[nom] = 1
            }
        }

        totalIngredients = totalIngredients + recette.nbIngredients

        if (recetteLaPlusLongue === null || recette.nbIngredients > recetteLaPlusLongue.nbIngredients) {
            recetteLaPlusLongue = recette
        }
    }

    let categorieLaPlusFrequente = ''
    for (const categorie of Object.keys(parCategorie)) {
        if (categorieLaPlusFrequente === '' || parCategorie[categorie] > parCategorie[categorieLaPlusFrequente]) {
            categorieLaPlusFrequente = categorie
        }
    }

    let moyenneIngredients = 0
    if (recettes.length > 0) {
        moyenneIngredients = Math.round(totalIngredients / recettes.length * 10) / 10
    }

    const top5Ingredients = Object.keys(parIngredient)
        .sort((a, b) => parIngredient[b] - parIngredient[a])
        .slice(0, 5)

    res.json({
        nbRecettes: recettes.length,
        parCategorie: parCategorie,
        parOrigine: parOrigine,
        categorieLaPlusFrequente: categorieLaPlusFrequente,
        moyenneIngredients: moyenneIngredients,
        recetteAvecLePlusDIngredients: recetteLaPlusLongue === null ? null : recetteLaPlusLongue.nom,
        top5Ingredients: top5Ingredients
    })
})

export default router
