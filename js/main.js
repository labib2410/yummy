/// <reference types="../@types/jquery" />

$('.sidebarBtn').click(function () {
    $('.sidebar').toggleClass('active');
    // $('.sidebar').toggleClass('d-none');

});
$(".sidebar ul li").click(function () {
    $('.sidebar').removeClass('active');

})

$('#searchAnc').click(function () {
    $('#search-part').removeClass('d-none');
    $('#categories').addClass('d-none');
    $('#Area').addClass('d-none');
    $('#ingred').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#meal-description').addClass('d-none');
});
$('#cateAnc').click(function () {
    $('#categories').removeClass('d-none');
    $('#first-page').addClass('d-none');
    fetchCategories();
    $('#search-part').addClass('d-none');
    $('#Area').addClass('d-none');
    $('#ingred').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#meal-description').addClass('d-none');

});

$('#areaAnc').click(function () {
    $('#categories').addClass('d-none');
    $('#first-page').addClass('d-none');
    fetchAreas();
    $('#search-part').addClass('d-none');
    $('#Area').removeClass('d-none');
    $('#ingred').addClass('d-none');
    $('#contact').addClass('d-none');
    $('#meal-description').addClass('d-none');

});

$('#ingAnc').click(function () {
    $('#categories').addClass('d-none');
    $('#first-page').addClass('d-none');
    fetchIng();
    $('#search-part').addClass('d-none');
    $('#Area').addClass('d-none');
    $('#ingred').removeClass('d-none');
    $('#meal-description').addClass('d-none');

    $('#contact').addClass('d-none');
});

$('#conAnc').click(function () {
    $('#categories').addClass('d-none');
    $('#first-page').addClass('d-none');
    $('#search-part').addClass('d-none');
    $('#Area').addClass('d-none');
    $('#ingred').addClass('d-none');
    $('#meal-description').addClass('d-none');
    $('#contact').removeClass('d-none');
    validateForm();
});


const namePattern = /^[a-zA-Z\s]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10}$/;
const passwordPattern = /^.{6,}$/;


function validateForm() {
    let isValid = true;


    if (!namePattern.test($("#name").val())) {
        $("#nameError").show();
        isValid = false;
    } else {
        $("#nameError").hide();
    }


    if (!emailPattern.test($("#email").val())) {
        $("#emailError").show();
        isValid = false;
    } else {
        $("#emailError").hide();
    }


    if (!phonePattern.test($("#phone").val())) {
        $("#phoneError").show();
        isValid = false;
    } else {
        $("#phoneError").hide();
    }


    const age = $("#age").val();
    if (age < 18 || age > 100) {
        $("#ageError").show();
        isValid = false;
    } else {
        $("#ageError").hide();
    }


    if (!passwordPattern.test($("#password").val())) {
        $("#passwordError").show();
        isValid = false;
    } else {
        $("#passwordError").hide();
    }

    if ($("#password").val() !== $("#repassword").val()) {
        $("#repasswordError").show();
        isValid = false;
    } else {
        $("#repasswordError").hide();
    }


    $("#submitBtn").prop("disabled", !isValid);
}


$("input").on("input", validateForm);


$("#signupForm").on("submit", function (e) {
    e.preventDefault();
    alert("Form submitted successfully!");
});

const mealContainer = document.getElementById('row-data1');
const details = document.getElementById('row-data2');
const mealCate = document.getElementById('row-data3');
const areaMeal = document.getElementById('row-data4');
const ingMeal = document.getElementById('row-data5');

let allData = [];
let allData2 = [];
let allData3 = [];
let allData4 = [];
let allData5 = [];

// Centralized error display function
function displayError(message) {
    return `<p>${message}. Please try again later.</p>`;
}

async function fetchMeals(key) {
    showLoading(); // Show loading
    try {
        $('#ingred').addClass('d-none');
        $('#first-page').removeClass('d-none');
        $('#Area').addClass('d-none');
        $('#categories').addClass('d-none');
        $('#contact').addClass('d-none');
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
        if (!response.ok) throw new Error('Failed to fetch meals');

        const data = await response.json();
        allData = data;
        displayMeals(allData.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        mealContainer.innerHTML = displayError('Error fetching meals');
    } finally {
        hideLoading(); // Hide loading
    }
}
fetchMeals('');

function displayMeals(meals) {
    if (!meals || meals.length === 0) {
        mealContainer.innerHTML = '<p>No meals found.</p>';
        return;
    }

    let cartona = '';
    for (let i = 0; i < meals.length; i++) {
        cartona += `
        <div class="col-md-3 position-relative">
            <img src="${meals[i].strMealThumb}"  class="w-100 z-4">
            <div class="overlay" onclick="fetchDetails(${meals[i].idMeal})">${meals[i].strMeal}</div>
        </div>`;
    }
    mealContainer.innerHTML = cartona;
}
async function fetchDetails(id) {
    showLoading(); // Show loading
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        if (!response.ok) throw new Error('Failed to fetch meal details');

        const data2 = await response.json();
        allData2 = data2;
        displayData2(allData2);
    } catch (error) {
        console.error('Error fetching meal details:', error);
        details.innerHTML = displayError('Error fetching meal details');
    } finally {
        hideLoading(); // Hide loading
    }
}

function displayData2(x) {
    if (!x.meals || x.meals.length === 0) {
        details.innerHTML = '<p>No meal details found.</p>';
        return;
    }

    let cartona2 = '';
    for (let i = 0; i < x.meals.length; i++) {
        cartona2 += `
        <div class="col-md-4">
            <img src="${x.meals[i].strMealThumb}" class="w-100" alt="">
            <h3>${x.meals[i].strMeal}</h3>
        </div>
        <div class="col-md-8">
            <h3 class="fw-bold">Instructions</h3>
            <p>${x.meals[i].strInstructions}</p>
            <span><h3 class="fw-bold">Area: </h3> ${x.meals[i].strArea} </span>
            <br>
            <span><h3 class="fw-bold">Category: </h3> ${x.meals[i].strCategory} </span>
            <h3 class="fw-bold">Recipes:</h3>
            <span class="border border-2 border-info p-2">${x.meals[i].strMeasure1} ${x.meals[i].strIngredient1}</span>
            <span class="border border-2 border-info p-2">${x.meals[i].strMeasure2} ${x.meals[i].strIngredient2}</span>
            <span class="border border-2 border-info p-2">${x.meals[i].strMeasure3} ${x.meals[i].strIngredient3}</span>
            <span class="border border-2 border-info p-2">${x.meals[i].strMeasure4} ${x.meals[i].strIngredient4}</span>
            <h3 class="fw-bold mt-2">Tags :</h3>
            <span>${x.meals[i].strTags}</span>
        </div>`;
    }
    details.innerHTML = cartona2;
    $('#first-page').addClass('d-none');
    $('#meal-description').removeClass('d-none').addClass('d-flex');
    $('#search-part').addClass('d-none');
    mealCate.classList.add('d-none');
    $('#Area').addClass('d-none');
}

$("#closeBtn").on("click", function () {
    $('#meal-description').addClass('d-none');
    fetchMeals('');
});

$('#searchInput').on('input', function () {
    fetchMeals($(this).val());
    $('#meal-description').addClass('d-none');
});

$('#searchInput2').on('input', function () {
    fetchMeals($(this).val());
    $('#meal-description').addClass('d-none');
});

async function fetchCategories() {
    showLoading(); // Show loading
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        if (!response.ok) throw new Error('Failed to fetch categories');

        const data = await response.json();
        allData3 = data;
        displayCate(allData3.categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        mealCate.innerHTML = displayError('Error fetching categories');
    } finally {
        hideLoading(); // Hide loading
    }
}

function displayCate(meals) {
    let cartona3 = '';
    for (let i = 0; i < meals.length; i++) {
        cartona3 += `
        <div class="col-md-3">
            <img src="${meals[i].strCategoryThumb}" onclick="fetchMeals('${meals[i].strCategory}')" class="w-100">
            
        </div>`;
    }
    mealCate.innerHTML = cartona3;
}

async function fetchAreas() {
    showLoading(); // Show loading
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        if (!response.ok) throw new Error('Failed to fetch areas');

        const data = await response.json();
        allData4 = data;
        displayArea(allData4);
    } catch (error) {
        console.error('Error fetching areas:', error);
        areaMeal.innerHTML = displayError('Error fetching areas');
    } finally {
        hideLoading(); // Hide loading
    }
}

function displayArea(areas) {
    let cartona4 = '';
    for (let i = 0; i < areas.meals.length; i++) {
        cartona4 += `
         <div class="col-md-3 text-center">
             <i class="fa-solid fa-home fs-1" onclick="fetchMeals('${areas.meals[i].strArea}')" ></i>
             <br>
             <h4  class="text-danger">${areas.meals[i].strArea}</h4>
         </div>`;
    }
    areaMeal.innerHTML = cartona4;
}

async function filterByArea(key) {
    showLoading(); // Show loading
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`);
        if (!response.ok) throw new Error('Failed to fetch meals');

        const data = await response.json();
        allData = data;
        displayMeals(allData.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
        mealContainer.innerHTML = displayError('Error fetching meals');
    } finally {
        hideLoading(); // Hide loading
    }
}

async function fetchIng() {
    showLoading(); // Show loading
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        if (!response.ok) throw new Error('Failed to fetch ingredients');

        const data = await response.json();
        allData5 = data;
        displayIng(allData5);
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        ingMeal.innerHTML = displayError('Error fetching ingredients');
    } finally {
        hideLoading(); // Hide loading
    }
}

function displayIng(ing) {
    let cartona4 = '';
    for (let i = 0; i < 20; i++) {
        const description = ing.meals[i].strDescription || ""; // Default to empty string if null
        const limitedDescription = limitWords(description, 20, 25);
        cartona4 += `
         <div class="col-md-3 text-center">
            <i class="fa-solid fa-bowl-food fs-1" onclick="fetchMeals('${ing.meals[i].strIngredient}')" ></i>
            <br>
            <h4 class="text-danger">${ing.meals[i].strIngredient}</h4>
            <p>${limitedDescription}</p>
         </div>`;
    }
    ingMeal.innerHTML = cartona4;
}

// Helper function to limit words
function limitWords(text, minWords, maxWords) {
    const words = text.split(' ').filter(word => word.length > 0);
    const wordCount = words.length;

    if (wordCount < minWords) {
        return text; // Return full text if it's less than the minimum
    }

    // Get a slice of the words based on min and max limits
    const limitedWords = words.slice(0, Math.min(wordCount, maxWords)).join(' ');

    return wordCount > maxWords ? `${limitedWords}...` : limitedWords;
}

// Show loading indicator
function showLoading() {
    $('#loading').addClass('d-flex');
    $('#loading').removeClass('d-none');
}

// Hide loading indicator
function hideLoading() {
    $('#loading').removeClass('d-flex');
    $('#loading').addClass('d-none');
}