var prices = [
    "$24", "$20", "$22", "$21", "$18", "$19", "$14", "$12", "$21", "$24", 
    "$24", "$18", "$17", "$18", "$20", "$20", "$24", "$21", "$16", "$14", 
    "$20", "$24", "$14", "$15"
];

async function getProduct() {
    var data = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s');
    var res = await data.json();
    // console.log(res.meals)
    // Check if 'meals' exists and is an array
    if (res.meals) {
        // Use a traditional for loop to iterate over the meals array
        for (var i = 0; i < 24; i++) {
        //     console.log(res.meals[i].strMealThumb); // Access the 'strMeal' property for the recipe name
        // }
         var product = document.getElementById('products');

        product.innerHTML += `<div class="card card2" style="width: 18rem;">
        <img class="card-img-top" src="${res.meals[i].strMealThumb}" alt="food image cap" class="img-fluid">
        <div class="card-body">
            <h5 class="card-title text-center">${res.meals[i].strMeal}</h5>
         <h4 class="text-center" style="color:var(--myColor)">${prices[i]}</h4>
           <button class="btn pricebtn">Order</button>
        </div>
        </div>`
    } }else {
        console.log("No meals found");
    }


}

getProduct();
