import * as D from './credentials.js'
import _ from 'lodash';


window.onload = function () {
    document.getElementById('form').addEventListener('submit', event => {
        event.preventDefault();
        document.getElementById('fullRecipe').style.display = "none";

        let inputIngredients = document.getElementById('inputIngredients').value;

        fetchData(inputIngredients);
    });
};

function fetchData(inputIngredients) {
    console.log(inputIngredients);

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=75381d3d2fc7422aa772ef4119eeb656&ingredients=${inputIngredients}&number=10`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            for (let h = 0; h < 10; h++) {
                let missingIngredients = [];
                let usedIngredients = [];

                let dataMissedIngredients = data[h].missedIngredients;
                let countMissedIngredients = data[h].missedIngredientCount;

                let dataUsedIngredients = data[h].usedIngredients;
                let countUsedIngredients = data[h].usedIngredientCount;

                for (let i = 0; i < countMissedIngredients; i++) {
                    let missingIngredient = dataMissedIngredients[i].name;

                    missingIngredients.push(" " + missingIngredient);
                }

                for (let j = 0; j < countUsedIngredients; j++) {
                    let usedIngredient = dataUsedIngredients[j].name;

                    usedIngredients.push(" " + usedIngredient);
                }

                let idRecipe = data[h].id


                fetch(`https://api.spoonacular.com/recipes/${idRecipe}/summary?apiKey=75381d3d2fc7422aa772ef4119eeb656`)
                    .then(response => response.json())
                    .then(dataOfSummery => {
                        let summaries = [];
                        for (let k = 0; k < countUsedIngredients; k++) {
                            let summary = dataOfSummery.summary;
                            summaries.push(" " + summary);

                            let dataInformation = {
                                title: data[h].title,
                                img: data[h].image,
                                ingredients: data[h].ingredients,
                                summary: summary
                            };

                            let htmlString = `
                            <div id="recipeItem">
                                <div id="recipe">
                                    <div id="hAndImg">
                                        <h2>${data[h].title}</h2>
                                        <img id="img" src="${data[h].image}" alt="">
                                    </div>
                                    <div id="textRecipe">
                                        <p id="usedIngredients"> Your ingredients used: ${usedIngredients}</p>
                                        <p id="otherIngredients"> Other ingredients used: ${missingIngredients}</p>
                                        <p id="summmaryRecipe">${summary}</p>
                                    </div>
                                </div>
                            <button id="showRecipeBtn">Show recipe</button>
                            </div>`;

                            document.getElementById('recipeList').insertAdjacentHTML("afterbegin", htmlString);

                            document.getElementById('showRecipeBtn').addEventListener('click', event => {
                                event.preventDefault();

                                console.log('clicked on recipe! ' + data[h].title);

                                showRecipe(idRecipe, dataInformation)

                            });
                        }

                    });
            };
        });
}

function showRecipe(idRecipe, dataInformation) {
    document.getElementById('recipeList').style.display = "none";
    document.getElementById('fullRecipe').style.display = "inline-block";

    console.log('Show tha recipeeee')

    fetch(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=75381d3d2fc7422aa772ef4119eeb656`)
        .then(response => response.json())
        .then(dataFullRecipe => {
            console.log(dataFullRecipe)

            let dataIngredientsAmount = dataFullRecipe.extendedIngredients

            for (let h = 0; h <= dataIngredientsAmount.length; h++) {
                let ingredients = [];
            
                let dataIngredients = dataFullRecipe[h].ingredients;
               
                for (let l = 0; l <= dataIngredientsAmount.length; l++) {
                    let ingredient = dataIngredients[i].name;


                    ingredients.push(" " + ingredient);
                }


                let htmlString = `
                <div id="fullRecipe">
                    <div id="recInformation">
                        <h2>${dataFullRecipe.title}</h2>
                        <img src="${dataFullRecipe.image}" alt="">
                        <p id="servings>${servings}</p>
                        <p id="timeReady">${readyInMinutes}</p>
                        <p id="ingredients">${dataFullRecipe.ingredients}</p>
                        <p id="ingredients>${extendedIngredients[h].measures.metric.amount} ${extendedIngredients[h].measures.metric.unitShort} ${extendedIngredients[h].name}</p>
                        
                        <p id="ingredients>${ingredients}</p>
                    </div>
                    <button id="saveRecipeBtn">Save recipe</button>
                </div>`
                        
                // <p id="ingredients>${extendedIngredients[h].name}: ${extendedIngredients[h].measures.metric.amount}</p>
                //<p id="summary>${dataFullRecipe.ingredients}</p>

                document.getElementById('fullRecipe').insertAdjacentHTML("afterbegin", htmlString);

            }

            document.getElementById('saveRecipeBtn').addEventListener('click', event => {
                event.preventDefault();

                console.log('clicked save recipe! ' + dataInformation.title + ' id = ' + idRecipe);
            });
        });



}