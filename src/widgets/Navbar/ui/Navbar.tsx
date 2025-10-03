import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUserName';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from '../../../entities/User';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(userActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<header className={classNames(cls.Navbar, {}, [className])}>
				<Button
					theme={ButtonTheme.CLEAR_INVERTED}
					className={cls.links}
					onClick={onLogout}
				>
					{t('Выйти')}
				</Button>

				{isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
			</header>
		);
	}

	return (
		<header className={classNames(cls.Navbar, {}, [className])}>
			<Button
				theme={ButtonTheme.CLEAR_INVERTED}
				className={cls.links}
				onClick={onShowModal}
			>
				{t('Войти')}
			</Button>

			<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
		</header>
	);
});
