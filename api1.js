const inputbox=document.querySelector("#search");
const btn=document.querySelector("#btn");
const container=document.querySelector(".recipe-container");
const details=document.querySelector('.recpice-details-content')
const closebtn=document.querySelector('.recipe-close-btn');

 // Function for API call

const fetchRecipes=async (query)=>{
    container.innerHTML = "<h2>Fetching Recipe.....</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
    
        container.innerHTML = "";
        if (response.meals) {
            response.meals.forEach(meal => {

                // create a div for recipe  //

                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <p><span> ${meal.strArea} </span> Dish</p>
                    <p><span>Belongs to ${meal.strCategory}</span> Category</p>
                `;

                // Creat a button for view the recipe of the Ingredents //

                const button=document.createElement('button');
                button.textContent="View Recipe"
                recipeDiv.appendChild(button);

            
                // adding button listern//

               button.addEventListener('click',()=>{
                openrecipe(meal);
               })
                container.appendChild(recipeDiv);
            });
        } else {
            container.innerHTML = "<h2>No recipes found</h2>";
        }
    } catch (error) {
        container.innerHTML = "<h2>Failed to fetch recipes</h2>";
        console.error("Error fetching recipes:", error);
    }
}
const fetchIngredients=(meal)=>{

 let ingredientsList="";
 for(let i=1; i<=20; i++){
    const ingredients=meal[`strIngredient${i}`];
    if(ingredients){
        const measure=meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredients}</li>`
    }
    else{
        break;
    }
 }
 return ingredientsList;
}
//container for the recipe details//

const openrecipe=(meal)=>{
details.innerHTML=`
<h2 style="color:black;">${meal.strMeal}</h2>
<h3 style= "color:black";>Ingredents:</h3>
<ul style="list-style-type:none";>${fetchIngredients(meal)}</ul>
`
document.getElementById('recipeDetails').style.display = 'block';
}
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    const input=inputbox.value.trim();
    fetchRecipes(input);

});

closebtn.addEventListener('click', () => {
    document.getElementById('recipeDetails').style.display = 'none';
});
