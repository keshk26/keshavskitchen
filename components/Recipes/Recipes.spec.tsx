import { fireEvent, render, screen } from '@testing-library/react-native';
import Recipes from './Recipes';
import fetchRecipes from '@/supabase/fetchRecipes';
import mockRecipes from './recipes.mock';

jest.mock('@/supabase/fetchRecipes', () => ({
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

describe('Recipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchRecipes as jest.Mock).mockResolvedValue(mockRecipes);
  });

  test('Recipe list renders correctly', async () => {
    render(<Recipes />);
    // Wait for and verify the first recipe
    expect(await screen.findByText('Thai')).toBeOnTheScreen();
    expect(screen.getByText('30 minutes')).toBeOnTheScreen();
    expect(screen.getByText('3 ingredients')).toBeOnTheScreen();

    // Verify the second recipe
    expect(screen.getByText('Margarita')).toBeOnTheScreen();
    expect(screen.getByText('Mexican')).toBeOnTheScreen();
    expect(screen.getByText('5 minutes')).toBeOnTheScreen();
    expect(screen.getByText('5 ingredients')).toBeOnTheScreen();
  });

  test('Selecting a recipe navigates to the recipe detail page', async () => {
    const { findByText } = render(<Recipes />);
    const recipeName = await findByText('Green Curry Fried Rice');
    fireEvent.press(recipeName);
    expect(mockNavigate).toHaveBeenCalledWith('/recipes/1');
  });

  test('Component unmounts without errors', () => {
    const { unmount } = render(<Recipes />);
    unmount();
    expect(true).toBe(true);
  });
});
