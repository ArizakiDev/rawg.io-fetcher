/*
 * ************************************************************
 * *                                                          *
 * *               Coded by Arizaki.xyz                       *
* *                     v1.0                                  *
 * *                                                          *
 * ************************************************************
 */



const axios = require('axios');
const fs = require('fs');
const path = require('path');

const apiKey = 'Your_apiKey';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&platforms=18`; //You can change the id for the plateform, check the doc

async function fetchGames(page) {
    try {
        const response = await axios.get(`${apiUrl}&page=${page}`);
        return response.data.results;
    } catch (error) {
        console.error(`Erreur lors de la récupération des jeux de la page ${page}:`, error.message);
        return [];
    }
}

async function main() {
    let currentPage = 1;
    let allGames = [];
    const maxPages = 100; //number maximum of pages

    while (currentPage <= maxPages) {
        console.log(`Chargement de la page ${currentPage}...`);
        const games = await fetchGames(currentPage);
        
        if (games.length > 0) {
            const filteredGames = games.map(game => ({
                id: game.id,
                name: game.name,
                slug: game.slug,
                background_image: game.background_image,
                links: [
                    { name: "PlayStation Store", url: `https://store.playstation.com/${game.slug}` },
                    { name: "Steam", url: `https://store.steampowered.com/${game.slug}` }
                ]
            }));
            
            allGames.push(...filteredGames);
            console.log(`${games.length} jeux ajoutés de la page ${currentPage}`);
            currentPage++;
            
            await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
            console.log('Aucun jeu trouvé sur cette page.');
            break;
        }
    }

    const outputPath = path.join(__dirname, 'games.json');
    
    if (allGames.length > 0) {
        try {
            if (!fs.existsSync(outputPath)) {
                console.log('Le fichier games.json n\'existe pas. Création du fichier...');
            }
            
            fs.writeFileSync(outputPath, JSON.stringify(allGames, null, 2));
            console.log(`Fichier games.json créé/mis à jour avec succès!`);
            console.log(`Structure du fichier JSON:`);
            console.log(`[
  {
    "id": "identifiant_du_jeu",
    "name": "nom_du_jeu",
    "slug": "slug_du_jeu",
    "background_image": "url_de_l_image",
    "links": [
      { "name": "PlayStation Store", "url": "url_playstation" },
      { "name": "Steam", "url": "url_steam" }
    ]
  },
  ...
]`);
        } catch (error) {
            console.error("Erreur lors de l'écriture du fichier:", error.message);
        }
    } else {
        console.log('Aucun jeu à enregistrer.');
    }
}

main()
    .then(() => console.log("Traitement terminé avec succès."))
    .catch(err => console.error("Une erreur s'est produite:", err.message));
