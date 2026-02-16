import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Favorites from './Favorites';
import fetchRecipes from '@/supabase/fetchRecipes';
import updateRecipe from '@/supabase/updateRecipe';
import mockRecipes from './favoriteRecipes.mock';

jest.mock('@/supabase/fetchRecipes', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('@/supabase/updateRecipe', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: mockNavigate
  }),
  useNavigation: () => ({
    setOptions: jest.fn()
  })
}));

describe('Favorites Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetchRecipes as jest.Mock).mockResolvedValue(mockRecipes);

    (updateRecipe as jest.Mock).mockResolvedValue(null);
  });

  test('should show NoFavorites component when there are no favorites', async () => {
    (fetchRecipes as jest.Mock).mockResolvedValueOnce([]);

    render(<Favorites />);
    expect(await screen.findByText('No favorites yet')).toBeOnTheScreen();
  });

  test('should render favorite recipes list', async () => {
    render(<Favorites />);
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();
    expect(screen.getByText('Margarita')).toBeOnTheScreen();
    expect(screen.queryByText('Honey Garlic Shrimp')).not.toBeOnTheScreen();
  });

  test('should navigate to recipe detail page when recipe is pressed', async () => {
    const { getByText } = render(<Favorites />);
    const recipeName = await getByText('Green Curry Fried Rice');
    fireEvent.press(recipeName);
    expect(mockNavigate).toHaveBeenCalledWith('/favorites/1');
  });

  test('should update favorite status when favorite button is pressed', async () => {
    render(<Favorites />);

    // Initial render should show the recipe
    expect(await screen.findByText('Green Curry Fried Rice')).toBeOnTheScreen();

    // Press the favorite button
    fireEvent.press(screen.getByTestId(`favorite-button-${mockRecipes[0].id}`));

    // Verify updateRecipe was called
    await waitFor(() => {
      expect(updateRecipe).toHaveBeenCalledWith(mockRecipes[0].id, { favorite: false });
    });

    // Without live updates, the list remains unchanged until a refetch
    expect(screen.getByText('Green Curry Fried Rice')).toBeOnTheScreen();
  });

  test('should unmount without errors', () => {
    const { unmount } = render(<Favorites />);
    unmount();
    expect(true).toBe(true);
  });
});
