import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { Theme } from '../../../const/theme';

interface UseThemeResult {
	toggleTheme: () => void;
	theme: Theme;
}

export function useTheme(): UseThemeResult {
	const { theme, setTheme } = useContext(ThemeContext);

	// const toggleTheme = () => {
	// 	const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
	// 	localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	// 	setTheme?.(newTheme);
	// 	document.body.className = newTheme;
	// 	localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	// };

	const toggleTheme = () => {
		let newTheme: Theme;

		switch (theme) {
			case Theme.DARK:
				newTheme = Theme.LIGHT;
				break;
			case Theme.LIGHT:
				newTheme = Theme.ORANGE;
				break;
			case Theme.ORANGE:
				newTheme = Theme.DARK;
				break;
			default:
				newTheme = Theme.DARK;
		}

		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
		setTheme?.(newTheme);
		document.body.className = newTheme;
		localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
	};

	return {
		theme: theme || Theme.LIGHT,
		toggleTheme,
	};
}
