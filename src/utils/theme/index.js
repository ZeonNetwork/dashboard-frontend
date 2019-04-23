export const getThemeFromStorage = () =>
  localStorage.getItem('theme') || 'pt-light';

export const setThemeToStorage = (theme) => {
  localStorage.setItem('theme', theme);
};

export const THEMES = {
  dark: 'pt-dark',
  light: 'pt-light'
};
