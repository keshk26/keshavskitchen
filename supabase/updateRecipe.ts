import { Recipe } from '@/types';
import { supabase } from './config';

const updateRecipe = async (id: string, recipeUpdate: Partial<Recipe>): Promise<void> => {
  const { error } = await supabase.from('recipes').update(recipeUpdate).eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
};

export default updateRecipe;
