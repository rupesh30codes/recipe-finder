function searchRecipes() {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (!searchInput) {
    alert('Please enter ingredients or keywords.');
    return;
  }

  const appId = 'c32a6d21'; 
  const appKey = '5394ecf5d06848f248b4ac4b1b02baff'; 
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${appId}&app_key=${appKey}&limit=10`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayRecipes(data.hits);
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
      alert('There was an error fetching recipes. Please try again.');
    });
}

function displayRecipes(recipes) {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = ''; 
  recipes.forEach(recipe => {
    const recipeData = recipe.recipe;

    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-card');

    const title = document.createElement('p');
    title.textContent = recipeData.label;

    const image = document.createElement('img');
    image.src = recipeData.image;

    const ingredientsList = document.createElement('ul');
    recipeData.ingredients.forEach(ingredient => {
      const ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient.text;
      ingredientsList.appendChild(ingredientItem);
    });

    const link = document.createElement('a');
    link.href = recipeData.url;
    link.textContent = 'View Recipe';

    recipeDiv.appendChild(title);
    recipeDiv.appendChild(image);
    recipeDiv.appendChild(ingredientsList);
    recipeDiv.appendChild(link);

    searchResultsDiv.appendChild(recipeDiv);
  });
}
