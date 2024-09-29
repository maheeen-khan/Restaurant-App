var prices = [
    "$24", "$20", "$22", "$21", "$18", "$19", "$14", "$12", "$21", "$24", 
    "$24", "$18", "$17", "$18", "$20", "$20", "$24", "$21", "$16", "$14", 
    "$20", "$24", "$14", "$15"
];

async function getProduct() {
    var data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    var res = await data.json();

    var product = document.getElementById('products');
    var item = document.getElementById('items');
    
    product.innerHTML = ''; // Clear previous content
    item.innerHTML = '<option value="" disabled selected>Select items</option>'; // Set default option
    
    // Check if 'meals' exists and is an array
    if (res.meals) {
        // Iterate over the meals array
        for (var i = 0; i < 24; i++) {
            // Append product cards
            product.innerHTML += `<div class="card card2" style="width: 18rem;">
            <img class="card-img-top" src="${res.meals[i].strMealThumb}" alt="food image cap" class="img-fluid">
            <div class="card-body">
                <h5 class="card-title text-center">${res.meals[i].strMeal}</h5>
             <h4 class="text-center" style="color:var(--myColor)">${prices[i]}</h4>
               <button class="btn pricebtn">Order</button>
            </div>
            </div>`;
            
            // Append options to the select dropdown
            item.innerHTML += `<option value="${res.meals[i].strMeal}">${res.meals[i].strMeal}</option>`;
        } 
    } else {
        console.log("No meals found");
    }
}

getProduct();

function searching() {
    var value = document.getElementById('search').value.toLowerCase();
    
    // Fetch the meals again and filter based on search input
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
        .then(response => response.json())
        .then(res => {
            var filteredMeals = res.meals.filter(meal => 
                meal.strMeal.toLowerCase().includes(value)
            );

            var product = document.getElementById('products');
            var item = document.getElementById('items');
            
            product.innerHTML = ''; // Clear previous content
            item.innerHTML = ''; // Clear previous select options

            if (filteredMeals.length > 0) {
                for (var i = 0; i < filteredMeals.length; i++) {
                    // Append filtered product cards
                    product.innerHTML += `<div class="card card2" style="width: 18rem;">
                    <img class="card-img-top" src="${filteredMeals[i].strMealThumb}" alt="food image cap" class="img-fluid">
                    <div class="card-body">
                        <h5 class="card-title text-center">${filteredMeals[i].strMeal}</h5>
                     <h4 class="text-center" style="color:var(--myColor)">${prices[i]}</h4>
                       <button class="btn pricebtn">Order</button>
                    </div>
                    </div>`;
                    
                    // Append options to the select dropdown
                    item.innerHTML += `<option value="${filteredMeals[i].strMeal}">${filteredMeals[i].strMeal}</option>`;
                }
            } else {
                product.innerHTML = '<p>No meals found</p>';
                item.innerHTML = '<option value="">No meals available</option>';
            }
        })
        .catch(err => console.log(err));
}
