import { Recipe, FilterOptions } from '@/types';
import { supabase } from './config';

const fetchRecipes = async (filter?: FilterOptions): Promise<Recipe[]> => {
  let query = supabase.from('recipes').select('*, ingredients(*)');

  if (filter?.favorite !== undefined) {
    query = query.eq('favorite', filter.favorite);
  }
  if (filter?.cuisine) {
    query = query.eq('cuisine', filter.cuisine);
  }
  const { data, error } = await query;
  console.log(error);
  console.log(data);
  if (error) {
    console.error('Error fetching recipes:', error.message);
    return [];
  }

  return (data ?? []) as Recipe[];
};

export default fetchRecipes;
