import OpenAI from 'openai';
import { Recipe } from '@/types';

type GenerateRecipeImage = (recipe: Recipe) => Promise<{
  imageUrl: string;
  imageExpiration?: string;
}>;

const generateRecipeImage: GenerateRecipeImage = async (recipe) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY
    });

    const prompt = `${recipe.cuisine} ${recipe.name}. Centered composition, overhead angle, on a minimalist ceramic plate.`;
    const imageParams: OpenAI.Images.ImageGenerateParams = {
      model: 'dall-e-3',
      n: 1,
      size: '1024x1024',
      prompt
    };

    const response = await openai.images.generate(imageParams);
    const imageUrl = response.data[0]?.url ?? '';
    const imageExpiration = imageUrl.match(/se=([^&]+)/)?.[1];
    return { imageUrl, imageExpiration };
  } catch (error) {
    console.error('Error generating recipe image:', error);
    throw error;
  }
};

export default generateRecipeImage;
