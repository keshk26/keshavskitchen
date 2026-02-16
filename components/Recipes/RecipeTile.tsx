import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Recipe } from '@/types';

interface RecipeTileProps {
  recipe: Recipe;
  onPress: (id: string) => void;
  onFavoritePress: (recipe: Recipe) => void;
  testID?: string;
  accessibilityLabel?: string;
}

const RecipeTile: React.FC<RecipeTileProps> = ({ recipe, onPress, onFavoritePress }) => {
  return (
    <Pressable
      className="flex-row items-center p-4 mb-4 bg-white shadow-sm rounded-xl"
      onPress={() => onPress(recipe.id)}
    >
      <View className="flex-1">
        <Text className="mb-1 text-lg font-semibold text-gray-800">
          {recipe?.name ?? 'Unknown'}
        </Text>
        <View className="flex-row gap-4">
          <View className="flex-row items-center gap-1">
            <Ionicons name="restaurant-outline" size={16} color="#666" />
            <Text className="text-sm text-gray-600">{recipe?.cuisine ?? 'Unknown'}</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text className="text-sm text-gray-600">{recipe?.time ?? 0} minutes</Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="list" size={16} color="#666" />
            <Text className="text-sm text-gray-600">
              {recipe?.ingredients?.length ?? 0} ingredients
            </Text>
          </View>
        </View>
      </View>
      <Pressable
        className="p-2"
        testID={`favorite-button-${recipe.id}`}
        onPress={() => onFavoritePress(recipe)}
      >
        <Ionicons name={recipe.favorite ? 'heart' : 'heart-outline'} size={24} color="#FF6B6B" />
      </Pressable>
    </Pressable>
  );
};

export default RecipeTile;
