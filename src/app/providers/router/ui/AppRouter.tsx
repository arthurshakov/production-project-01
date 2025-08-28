import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "shared/config/routeConfig/routeConfig"

export const AppRouter = () => {
	console.log(Object.values(routeConfig));

	return (
		<Suspense fallback={<div>...loading</div>}>
			<Routes>
				{Object.values(routeConfig).map(({element, path}) => {
					return <Route
						key={path}
						path={path}
						element={(
							<div className="page-wrapper">
								{element}
							</div>
						)}
					/>
				})}
			</Routes>
		</Suspense>
	)
}