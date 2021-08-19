import '../css/main.css';

const API = {
    categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
    byCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    searchById: 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=',
    ingredientImage: 'https://www.themealdb.com/images/ingredients/',
    randomMeal: 'https://www.themealdb.com/api/json/v1/1/random.php',
    searchByName: 'https://www.themealdb.com/api/json/v1/1/search.php?s='
};

const mealsSec = document.getElementById('meals');
const randomMeal = document.getElementById('randommeal');
const searchInput = document.getElementById('Byname');


searchInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        window.searchMeal();
    }
});

window.addEventListener('DOMContentLoaded', function () {
    mealsSec.innerHTML = '';
    randomMeal.innerHTML = '';

    fetch(`${API.byCategory}Beef`)
        .then(res => res.json())
        .then(data => data.meals)
        .then(meals => {
            meals.forEach(meal => {
                mealsSec.innerHTML += `
                    <div class="food-container" onclick="window.test(${meal.idMeal})" 
                        style="background: url(${meal.strMealThumb});no-repeat; background-size: cover;">
                        <section class="food-data">
                            <p class="p-card">Name:${meal.strMeal} <br>
                                Region: ${meal.idMeal} </p>
                        </section>
                    </div>
                `
            })
        })

    fetch(API.randomMeal)
        .then(res => res.json())
        .then(data => data.meals[0])
        .then(meal => {
            randomMeal.innerHTML += `
        <div class="random-container" onclick="window.test(${meal.idMeal})" 
            style="background: url(${meal.strMealThumb});no-repeat; background-size: cover;">
            <section class="food-data-random">
                <p class="p-card">Name: ${meal.strMeal} <br>
                    Region: ${meal.idMeal} </p>
            </section>
        </div>
        `
        })
});


window.getMealsByCategory = function (category) {
    // window.location.reload();

    mealsSec.innerHTML = '';

    fetch(`${API.byCategory}${category}`)
        .then(res => res.json())
        .then(data => data.meals)
        .then(meals => {
            meals.forEach(meal => {
                mealsSec.innerHTML += `
                    <div class="food-container" onclick="window.test(${meal.idMeal})" 
                        style="background: url(${meal.strMealThumb}); no-repeat; background-size: cover;">
                        <section class="food-data">
                            <p class="p-card">Name:${meal.strMeal} <br>
                                Region: ${meal.idMeal} </p>
                        </section>
                    </div>
                `
            })
        })
}

window.getMealRandom = function () {
    randomMeal.innerHTML = '';

    fetch(API.randomMeal)
        .then(res => res.json())
        .then(data => data.meals[0])
        .then(meal => {
            randomMeal.innerHTML += `
            <div class="random-container" onclick="window.test(${meal.idMeal})" 
                style="background: url(${meal.strMealThumb});no-repeat; background-size: cover;">
                <section class="food-data-random">
                    <p class="p-card">Name: ${meal.strMeal} <br>
                        Region: ${meal.idMeal} </p>
                </section>
            </div>
            `
        })

}

window.searchMeal = function() {
    mealsSec.innerHTML = '';

    let str = document.getElementById('Byname').value;


    fetch(`${API.searchByName}${str}`)
        .then(res => res.json())
        .then(data => data.meals)
        .then(meals => {
            meals.forEach(meal => {
                mealsSec.innerHTML += `
                    <div class="food-container" onclick="window.test(${meal.idMeal})" 
                    style="background: url(${meal.strMealThumb});no-repeat; background-size: cover;">
                        <section class="food-data">
                            <p class="p-card">Name:${meal.strMeal} <br>
                                Region: ${meal.idMeal} </p>
                        </section>
                    </div>
                `
            })
        })
}

window.test = function (id) {
    window.location.href = "./Recipes.html?mealID=" + encodeURIComponent(id);
}