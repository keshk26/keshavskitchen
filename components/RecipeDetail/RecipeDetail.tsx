import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import useRecipeDetail from './useRecipeDetail';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useCallback, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import updateRecipe from '@/firebase/updateRecipe';

const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipe, loading, imageLoading, generateImage } = useRecipeDetail(id);
  const navigation = useNavigation();

  const isFavorite = useMemo(() => {
    return recipe?.favorite || false;
  }, [recipe]);

  const imageExpired = useMemo(() => {
    return recipe?.imageExpiration
      ? new Date(decodeURIComponent(recipe.imageExpiration)) < new Date()
      : false;
  }, [recipe]);

  const toggleFavorite = useCallback(async () => {
    if (!recipe) return;
    const toggledFavorite = !isFavorite;
    try {
      await updateRecipe(recipe.id, { favorite: toggledFavorite });
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  }, [recipe, isFavorite]);

  useEffect(() => {
    if (!loading && recipe) {
      navigation.setOptions({
        title: recipe.name,
        headerRight: () => (
          <Pressable
            onPress={toggleFavorite}
            className="mr-4"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            testID="favorite-button"
          >
            <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="#FF6B6B" />
          </Pressable>
        )
      });
    }
  }, [loading, recipe, isFavorite, toggleFavorite, navigation]);

  if (!recipe) {
    return (
      <View className="items-center justify-center flex-1 bg-bgDefault">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-bgDefault">
      <View className="p-4">
        {/* AI Generated Image Section */}
        <View className="mb-6">
          {recipe?.imageUrl && !imageExpired && !imageLoading ? (
            <ExpoImage
              testID="ai-image"
              source={{ uri: recipe?.imageUrl }}
              style={{ width: '100%', height: 256, borderRadius: 16 }}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          ) : (
            <Pressable
              onPress={generateImage}
              className="items-center justify-center w-full h-64 bg-gray-100 rounded-lg"
              disabled={imageLoading}
            >
              {imageLoading ? (
                <ActivityIndicator size="large" color="#FF4B4B" />
              ) : (
                <View className="items-center">
                  <Ionicons name="image-outline" size={48} color="#FF4B4B" />
                  <Text className="px-4 py-2 mt-2 font-medium text-[#FF4B4B]">
                    GENERATE AI IMAGE
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        </View>
        {recipe?.imageUrl && !imageExpired && !imageLoading && (
          <Pressable onPress={generateImage}>
            <Text className="text-[#FF4B4B] font-semibold text-center text-xl">
              GENERATE DIFFERENT IMAGE
            </Text>
          </Pressable>
        )}

        <View className="my-6">
          <Text className="text-gray-600">Cuisine: {recipe.cuisine}</Text>
          <Text className="text-gray-600">Time: {recipe.time} minutes</Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold">Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} className="mb-1 text-gray-600">
              • <Text>{ingredient}</Text>
            </Text>
          ))}
        </View>

        <View>
          <Text className="mb-2 text-xl font-semibold">Instructions</Text>
          {recipe.instructions.map((instruction, index) => (
            <Text key={index} className="mb-2 text-gray-600">
              {index + 1}. <Text>{instruction}</Text>
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
