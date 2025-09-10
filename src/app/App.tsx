import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';
import { AppRouter } from './providers/router';

export function App() {
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
