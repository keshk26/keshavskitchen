import { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types';
import fetchRecipe from '@/supabase/fetchRecipe';
import generateRecipeImage from '@/openai/fetchImage';
import updateRecipe from '@/supabase/updateRecipe';

const useRecipeDetail = (id: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    let active = true;

    fetchRecipe(id)
      .then((recipe) => {
        if (!active) return;
        setRecipe(recipe);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const generateImage = useCallback(async () => {
    if (!recipe) return;

    try {
      setImageLoading(true);
      const { imageUrl, imageExpiration } = await generateRecipeImage(recipe);
      if (imageUrl) {
        await updateRecipe(recipe.id, { imageUrl, imageExpiration });
      }
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setImageLoading(false);
    }
  }, [recipe]);

  return { recipe, loading, imageLoading, generateImage };
};

export default useRecipeDetail;
