import './styles/index.scss';
import { Route, Routes, Link } from "react-router-dom";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

export const App = () => {
	const {theme, toggleTheme} = useTheme();

	return (
		<div className={classNames('app', {hovered: true}, [theme])}>
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<button onClick={toggleTheme}>Toggle theme</button>

			<Suspense fallback={<div>...loading</div>}>
				<Routes>
					<Route path="/about" element={<AboutPageAsync />} />
					<Route path="/" element={<MainPageAsync />} />
				</Routes>
			</Suspense>
		</div>
	)
}