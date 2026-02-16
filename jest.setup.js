import { jest } from '@jest/globals';

// Mock Expo Vector Icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons'
}));

// Mock the supabase.config module
jest.mock('@/supabase/config', () => {
  return {
    __esModule: true,
    supabase: {
      from: jest.fn(() => ({
        select: jest.fn(),
        update: jest.fn(),
        eq: jest.fn(),
        single: jest.fn()
      })),
      channel: jest.fn(() => ({
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn(() => ({}))
      })),
      removeChannel: jest.fn()
    }
  };
});
