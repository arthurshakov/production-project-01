import { createContext } from 'react';
import { Theme } from '../../const/theme';

export interface ThemeContextInterface {
  theme?: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextInterface>({});
