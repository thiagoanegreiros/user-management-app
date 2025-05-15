import themeReducer, { toggleTheme, setTheme } from './themeSlice';

describe('themeSlice', () => {
  it('should return the initial state', () => {
    const initialState = undefined;
    const action = { type: 'unknown' };
    const state = themeReducer(initialState, action);
    expect(state).toEqual({ mode: 'light' });
  });

  it('should toggle theme from light to dark', () => {
    const state = { mode: 'light' };
    const newState = themeReducer(state, toggleTheme());
    expect(newState).toEqual({ mode: 'dark' });
  });

  it('should toggle theme from dark to light', () => {
    const state = { mode: 'dark' };
    const newState = themeReducer(state, toggleTheme());
    expect(newState).toEqual({ mode: 'light' });
  });

  it('should set theme to dark using setTheme', () => {
    const state = { mode: 'light' };
    const newState = themeReducer(state, setTheme('dark'));
    expect(newState).toEqual({ mode: 'dark' });
  });

  it('should set theme to light using setTheme', () => {
    const state = { mode: 'dark' };
    const newState = themeReducer(state, setTheme('light'));
    expect(newState).toEqual({ mode: 'light' });
  });
});
