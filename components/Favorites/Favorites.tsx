import React from 'react';
import { View, ScrollView } from 'react-native';
import useRecipe from '../Recipes/useRecipe';
import { useRouter } from 'expo-router';
import updateRecipe from '@/supabase/updateRecipe';
import { Recipe } from '@/types';
import SuspenseFallback from '../Global/SuspenseFallback';
import NoFavorites from './NoFavorites';

const RecipeTile = React.lazy(() => import('../Recipes/RecipeTile'));

const Favorites = () => {
  const router = useRouter();
  const { recipes } = useRecipe({ favorite: true });

  const handleRecipePress = (id: string) => {
    router.navigate(`/favorites/${id}`);
  };

  const handleFavoritePress = async (recipe: Recipe) => {
    try {
      await updateRecipe(recipe.id, { favorite: !recipe.favorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  return (
    <SuspenseFallback>
      <ScrollView className="flex-1 bg-bgDefault">
        <View className="p-4">
          {recipes?.length === 0 && <NoFavorites />}
          {recipes?.map((recipe) => (
            <RecipeTile
              key={recipe.id}
              recipe={recipe}
              onPress={handleRecipePress}
              onFavoritePress={handleFavoritePress}
            />
          ))}
        </View>
      </ScrollView>
    </SuspenseFallback>
  );
};

export default Favorites;
