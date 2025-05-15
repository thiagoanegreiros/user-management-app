import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../../store/themeSlice';
import { ThemeToggle } from './ThemeToggle';

const renderWithStore = (initialTheme = 'light') => {
  const store = configureStore({
    reducer: { theme: themeReducer },
    preloadedState: { theme: { mode: initialTheme } },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    ),
  };
};

describe('ThemeToggle', () => {
  it('should render with text "Dark Mode" when theme is light', () => {
    renderWithStore('light');
    expect(screen.getByRole('button')).toHaveTextContent('Dark Mode');
  });

  it('should render with text "Light Mode" when theme is dark', () => {
    renderWithStore('dark');
    expect(screen.getByRole('button')).toHaveTextContent('Light Mode');
  });

  it('should dispatch toggleTheme when clicked', () => {
    const { store } = renderWithStore('light');
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(store.getState().theme.mode).toBe('dark');
  });
});
