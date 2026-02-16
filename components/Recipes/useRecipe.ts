import { useState, useEffect, useMemo } from 'react';
import { Recipe, FilterOptions } from '@/types';
import fetchRecipes from '@/supabase/fetchRecipes';

interface UseRecipeReturn {
  recipes: Recipe[] | null;
  loading: boolean;
  cuisines: string[];
}

const useRecipe = (filterOption: FilterOptions): UseRecipeReturn => {
  const [allRecipes, setAllRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Create a filter reference for favorite filter only
  // This is filtered via supabase
  const favoriteFilter = useMemo(() => {
    if (!filterOption?.favorite) return;
    return { favorite: filterOption.favorite };
  }, [filterOption?.favorite]);

  // Compute cuisines list only when allRecipes changes
  const cuisines = useMemo(() => {
    if (!allRecipes) return [];
    return [...new Set(allRecipes.map((recipe) => recipe.cuisine))].sort();
  }, [allRecipes]);

  // Filter recipes based on selected cuisine
  const recipes = useMemo(() => {
    if (!allRecipes) return null;
    if (!filterOption?.cuisine?.length) return allRecipes;
    return allRecipes.filter((recipe) => recipe.cuisine === filterOption.cuisine);
  }, [allRecipes, filterOption?.cuisine]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchRecipes(favoriteFilter)
      .then((fetchedRecipes) => {
        if (!active) return;
        setAllRecipes(fetchedRecipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [favoriteFilter]);

  return { recipes, loading, cuisines };
};

export default useRecipe;
