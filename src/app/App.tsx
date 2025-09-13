import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../entities/User';
import { AppRouter } from './providers/router';

export function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userActions.initAuthData());
	}, [dispatch]);

	return (
		<div className={classNames('app', { hovered: true }, [])}>
			<Suspense fallback="">
				<Navbar />

				<div className="content-page">
					<Sidebar />

					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
}
