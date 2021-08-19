const API = {
    categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    byCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    searchById: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    ingredientImage: 'https://www.themealdb.com/images/ingredients/',
    randomMeal: 'https://www.themealdb.com/api/json/v1/1/random.php'
};

window.addEventListener('DOMContentLoaded', function () {
    let ID = location.search.split('mealID=')[1]

    const coverSec = document.getElementById('cover');
    const instructionsSec = document.getElementById('instructions');
    const tutorialSec = document.getElementById('tutorial');
    const ingredientsSec = document.getElementById('ingredients');
    const recommendationsSec = document.getElementById('Reco-grid')

    const cleanMeal = {
        ingredients: [],
        measurements: []
    };

    fetch(`${API.searchById}${ID}`)
        .then((res) => res.json())
        .then(data => data.meals[0])
        .then(meal => {

            // doc: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (let [key, value] of Object.entries(meal)) {
                let par = [];

                par.push(value);

                // doc: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
                if (key.indexOf('strIngredient') !== -1) {
                    if (value !== null && value !== '') cleanMeal.ingredients.push(par);
                }
                else if (key.indexOf('strMeasure') !== -1) {
                    if (value !== null && value !== '' && value !== ' ') cleanMeal.measurements.push(par);
                }
                else if (value !== null && value !== '') cleanMeal[key] = value;

            }
            const ingredients = cleanMeal.ingredients;
            const measurements = cleanMeal.measurements;



            coverSec.innerHTML = `
            <section  class="img-food-container" style="background: linear-gradient(to top right, rgba(0, 0, 0, 0.5), rgba(196, 194, 194, 0.5)), url(${meal.strMealThumb}) no-repeat; background-size: cover; background-position: 0 8%;">
                <a href="./index.html"><i class="fa fa-chevron-left return-icon"></i></a>
                <section>
                    <h2 id="title">${meal.strMeal}</h2>
                    <i class="fas fa-map-marker-alt gps-icon"></i> ${meal.strArea}
                </section>  
            </section>
            `;

            instructionsSec.innerHTML = `
                <h3>Instructions</h3>
                <p>${meal.strInstructions}</p>
            `

            ingredients.map((i, index) => {
                if (i !== NaN) {
                    ingredientsSec.innerHTML += `
                <div class="item-ingredient" style="background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0)), url(https://www.themealdb.com/images/ingredients/${i}-Small.png) no-repeat; background-size: cover;">
                    <div class="data-ingredient">
                        Name:${i} <br>
                        Quantity: ${measurements[index]} 
                    </div>
                </div>
                `
                }
            })


            var res = meal.strYoutube.split("=");
            tutorialSec.innerHTML = `
                <h3>Tutorial</h3>
                <div class="video-container">
                    <iframe width="500" height="315" src="https://www.youtube.com/embed/${res[1]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            `

            console.log(measurements[0])
        })
    
    for(var i = 0; i < 3; i++){
        fetch(API.randomMeal)
        .then(res => res.json())
        .then(data => data.meals[0])
        .then(meal => {
            recommendationsSec.innerHTML += `
            <div class="food-container" onclick="window.test(${meal.idMeal})"
            style="background: url(${meal.strMealThumb});no-repeat; background-size: cover;"
            >
                <section class="food-data">
                    <p class="p-card">Name: ${meal.strMeal} <br>
                        Region: </p>
                </section>
            </div>
        `
        })
    }
});

window.test = function (id) {
    window.location.href = "./Recipes.html?mealID=" + encodeURIComponent(id);
}