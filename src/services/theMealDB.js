const mealDBKey = import.meta.env.VITE_MEAL_DB_KEY;

const mealDBAPI = `https://www.themealdb.com/api/json/v2/${mealDBKey}`;

export const getMealById = async (id) => {
  if (!id) {
    return { success: false, data: "Missing Id" };
  }
  return await fetch(`${mealDBAPI}/lookup.php?i=${id}`)
    .then((res) => ({ success: true, data: res }))
    .catch((err) => ({
      success: false,
      data: err,
    }));
};

export const getMealsByIngredients = async (ingredients) => {
  if (!ingredients.length) {
    return { success: false, data: "Missing Ingredients" };
  }
  const formattedIngredients = ingredients
    .map((ingredient) => ingredient.toLowerCase().replaceAll(" ", "_"))
    .join(",");

  console.log({ formattedIngredients });
  return;

  return await fetch(`${mealDBAPI}/filter.php?i=${formattedIngredients}`)
    .then((res) => ({ success: true, data: res }))
    .catch((err) => ({
      success: false,
      data: err,
    }));
};

export const get10RandomMeals = async () => {
  return await fetch(`${mealDBAPI}/randomselection.php`)
    .then((res) => res.json())
    .then((res) => ({ success: true, data: res }))
    .catch((err) => ({
      success: false,
      data: err,
    }));
};
