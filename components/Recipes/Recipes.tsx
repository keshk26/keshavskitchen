import { View, ScrollView, Pressable } from 'react-native';
import useRecipe from './useRecipe';
import { useRouter, useNavigation } from 'expo-router';
import updateRecipe from '@/supabase/updateRecipe';
import { Recipe } from '@/types';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CuisineFilterModal from './CuisineFilterModal';
import SuspenseFallback from '../Global/SuspenseFallback';

const RecipeTile = React.lazy(() => import('./RecipeTile'));

const Recipes = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const { recipes, cuisines } = useRecipe({ cuisine: selectedCuisine });
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setIsFilterModalVisible(true)}
          className="mr-4"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          testID="filter-button"
        >
          <Ionicons
            name={selectedCuisine ? 'filter' : 'filter-outline'}
            size={24}
            color="#FF6B6B"
          />
        </Pressable>
      )
    });
  }, [navigation, selectedCuisine]);

  const handleRecipePress = (id: string) => {
    router.navigate(`/recipes/${id}`);
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
      <CuisineFilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        selectedCuisine={selectedCuisine}
        onSelectCuisine={(cuisine) => {
          setSelectedCuisine(cuisine);
          setIsFilterModalVisible(false);
        }}
        cuisines={cuisines}
      />
    </SuspenseFallback>
  );
};

export default Recipes;
