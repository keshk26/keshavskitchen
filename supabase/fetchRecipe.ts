import { Recipe } from '@/types';
import { supabase } from './config';

const fetchRecipe = async (id: string): Promise<Recipe | null> => {
  const { data, error } = await supabase
    .from('recipes')
    .select('*, ingredients(*), instructions(*)')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching recipe:', error.message);
    return null;
  }

  return (data ?? null) as Recipe | null;
};

export default fetchRecipe;
