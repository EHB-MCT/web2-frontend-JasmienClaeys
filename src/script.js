import * as D from './credentials.js'
import _ from 'lodash';


window.onload = function () {
    document.getElementById('form').addEventListener('submit', event => {
        event.preventDefault();
        let inputIngredients = document.getElementById('inputIngredients').value;
        fetchData(inputIngredients);


    });
};

function fetchData(inputIngredients) {
    console.log(inputIngredients);

    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=052ac81a9d0f4b35bce9cc8e6e20d5e9&ingredients=${inputIngredients}&number=10`)
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
                

                fetch(`https://api.spoonacular.com/recipes/${idRecipe}/summary?apiKey=052ac81a9d0f4b35bce9cc8e6e20d5e9`)
                .then(response => response.json())
                .then(dataOfSummery => {
                    let summaries = [];
                    for (let k = 0; k < countUsedIngredients; k++) {
                        let summary = dataOfSummery[k].summary;
                        // console.log(dataOfSummery.summary);

                        summaries.push(" " + summary);
                        // console.log(summaries);


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

                            showRecipe(idRecipe)
                        });
                        
                    }

                });

                // showSummary(idRecipe, countUsedIngredients, data, usedIngredients, missingIngredients);
            };
        });
}


function showSummary(idRecipe, countUsedIngredients, data, usedIngredients, missingIngredients) {
    // fetch(`https://api.spoonacular.com/recipes/${idRecipe}/summary?apiKey=052ac81a9d0f4b35bce9cc8e6e20d5e9`)
    //     .then(response => response.json())
    //     .then(dataOfSummery => {
    //         // console.log(data);

    //         let summaries = [];
    //         for (let h = 0; h < countUsedIngredients; h++) {
    //             let summary = dataOfSummery.summary;
    //             // console.log(dataOfSummery.summary);

    //             summaries.push(" " + summary);
    //             // console.log(summaries);


    //             let htmlString = `
    //                 <div id="recipeItem">
    //                     <div id="recipe">
    //                         <div id="hAndImg">
    //                             <h2>${data[h].title}</h2>
    //                             <img id="img" src="${data[h].image}" alt="">
    //                         </div>
    //                         <div id="textRecipe">
    //                             <p id="usedIngredients"> Your ingredients used: ${usedIngredients}</p>
    //                             <p id="otherIngredients"> Other ingredients used: ${missingIngredients}</p>
    //                             <p id="summmaryRecipe">${dataOfSummery.summary}</p>
    //                         </div>
    //                     </div>
    //                 <button id="showRecipeBtn">Show recipe</button>
    //                 </div>`;
                    
    //             document.getElementById('recipeList').insertAdjacentHTML("afterbegin", htmlString);

    //             document.getElementById('showRecipeBtn').addEventListener('click', event => {
    //                 event.preventDefault();

    //                 console.log('clicked on recipe! ' + data[h].title);

    //                 showRecipe(idRecipe)
    //             });

    //         }

    //     });

}

function showRecipe(idRecipe) {

    console.log('Show tha recipeeee')

    // let htmlString = `
    // <button id="saveRecipeBtn">Save recipe</button>`


    // document.getElementById('saveRecipeBtn').addEventListener('click', event => {
    //     event.preventDefault();

    //     console.log('clicked save recipe! ' + data[h].title + 'id= ' + data[h].id)
    // });

}