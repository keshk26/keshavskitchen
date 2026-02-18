export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  time: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  favorite?: boolean;
  imageUrl?: string;
  imageExpiration?: string;
}

export interface Ingredient {
  id: string;
  text: string;
  position: number;
  recipe_id: string;
}

export interface Instruction {
  id: string;
  text: string;
  position: number;
  recipe_id: string;
}

export type FilterOptions = {
  favorite?: boolean;
  cuisine?: string;
};
