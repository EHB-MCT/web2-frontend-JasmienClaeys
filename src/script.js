import _ from 'lodash';


window.onload = function () {
    document.getElementById('form').addEventListener('submit', event => {
        event.preventDefault();
        let inputIngredients = document.getElementById('inputIngredients').value;
        fetchData(inputIngredients);


    });
};


console.log(event.target);

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

                let htmlString = `<div id="recipe">
                        <h2>${data[h].title}</h2>
                        <img src="${data[h].image}" alt="">
                        <p id="usedIngredients"> Your ingredients used: ${usedIngredients}</p>
                        <p id="otherIngredients"> Other ingredients used: ${missingIngredients}</p>
                        <button id="saveRecipeBtn">Save recipe</button>
                    </div>`;

                document.getElementById('recipeList').insertAdjacentHTML("afterbegin", htmlString);

                document.getElementById("saveRecipeBtn").addEventListener('click', event => {
                    event.preventDefault();

                    console.log('clicked!')
                });
            }
        });
}