import { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited } from '../entities/User';
import { AppRouter } from './providers/router';
import { initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

function App() {
	const { theme } = useTheme();
	const dispatch = useAppDispatch();
	const inited = useSelector(getUserInited);

	useEffect(() => {
		dispatch(initAuthData());
	}, [dispatch]);

	if (!inited) {
		return <PageLoader />;
	}

	return (
		<div className={classNames('app', { hovered: true }, [theme])}>
			<Suspense fallback="">
				<Navbar />

				<div className="content-page">
					<Sidebar />

					{inited && <AppRouter />}
				</div>
			</Suspense>
		</div>
	);
}

export default App;
