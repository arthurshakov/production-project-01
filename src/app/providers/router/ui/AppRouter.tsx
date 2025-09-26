import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutesProps, routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
	// const { t } = useTranslation();

	// const isAuth = useSelector(getUserAuthData);

	// const routes = useMemo(() => {
	// 	return Object.values(routeConfig).filter((route) => {
	// 		if (route.authOnly && !isAuth) {
	// 			return false;
	// 		}

	// 		return true;
	// 	});
	// }, [isAuth]);

	const renderWithWrapper = useCallback((route: AppRoutesProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>
				<div className="page-wrapper">
					{route.element}
				</div>
			</Suspense>
		);

		return (
			<Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
			/>
		);
	}, []);

	return (
		<Suspense fallback={<PageLoader />}>
			<Routes>
				{Object.values(routeConfig).map(renderWithWrapper)}
				{/* {routes.map(({ element, path }) => (
					<Route
						key={path}
						path={path}
						element={(
							<div className="page-wrapper">
								{element}
							</div>
						)}
					/>
				))} */}
			</Routes>
		</Suspense>
	);
});
