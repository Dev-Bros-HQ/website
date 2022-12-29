export const foodCategories = {
  Fruits: {
    name: "Fruits",
    value: "fruits",
    icon: "🍎",
  },
  Vegetables: {
    name: "Vegetables",
    value: "vegetables",
    icon: "🥕",
  },
  Grains: {
    name: "Grains",
    value: "grains",
    icon: "🥖",
  },
  "Protein Foods": {
    name: "Protein Foods",
    value: "protein-foods",
    icon: "🥩",
  },
  Dairy: {
    name: "Dairy",
    value: "dairy",
    icon: "🧀",
  },
};

export const foodMeasurments = [
  { label: "Teaspoon", value: "tsp" },
  { label: "Tablespoon", value: "tbsp" },
  { label: "Fluid Ounce", value: "fl oz" },
  { label: "Cup", value: "cup" },
  { label: "Pint", value: "pt" },
  { label: "Quart", value: "qt" },
  { label: "Gallon", value: "gal" },
  { label: "Milliliter", value: "mL" },
  { label: "Liter", value: "L" },
  { label: "Milligram", value: "mg" },
  { label: "Gram", value: "g" },
  { label: "Kilogram", value: "kg" },
  { label: "Pound", value: "lb" },
  { label: "Ounce", value: "oz" },
  { label: "Dash", value: "dash" },
  { label: "Pinch", value: "pinch" },
  { label: "Drop", value: "drop" },
];

export const formatMealFromMealDB = (meal) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    if (meal?.[`strIngredient${i}`]?.length) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        qty: meal[`strMeasure${i}`],
      });
    }
  }
  return { ...meal, ingredients };
};
