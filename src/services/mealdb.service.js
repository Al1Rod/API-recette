const BASE = 'https://www.themealdb.com/api/json/v1/1'

function estVide(valeur) {
    return valeur === null || valeur === undefined || String(valeur).trim() === ''
}

function enleverChampsVides(objet) {
    const resultat = {}
    for (const cle of Object.keys(objet)) {
        if (!estVide(objet[cle])) {
            resultat[cle] = objet[cle]
        }
    }
    return resultat
}

function nettoyer(recette) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        const nom = recette['strIngredient' + i]
        const quantite = recette['strMeasure' + i]

        if (!estVide(nom)) {
            ingredients.push(enleverChampsVides({ nom: nom, quantite: quantite }))
        }
    }

    return enleverChampsVides({
        id: recette.idMeal,
        nom: recette.strMeal,
        categorie: recette.strCategory,
        origine: recette.strArea,
        instructions: recette.strInstructions,
        image: recette.strMealThumb,
        tags: recette.strTags,
        youtube: recette.strYoutube,
        source: recette.strSource,
        nbIngredients: ingredients.length,
        ingredients: ingredients
    })
}

export async function chercherRecettes(nom) {
    const response = await fetch(BASE + '/search.php?s=' + nom)
    const donnees = await response.json()

    if (donnees.meals === null) {
        return []
    }
    return donnees.meals.map(nettoyer)
}

export async function chercherUneRecette(id) {
    const response = await fetch(BASE + '/lookup.php?i=' + id)
    const donnees = await response.json()

    if (!Array.isArray(donnees.meals)) {
        return null
    }
    return nettoyer(donnees.meals[0])
}

export async function recetteAleatoire() {
    const response = await fetch(BASE + '/random.php')
    const donnees = await response.json()
    return nettoyer(donnees.meals[0])
}
