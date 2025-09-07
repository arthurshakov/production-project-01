import { classNames } from 'shared/lib/classNames/classNames';
import { useState } from 'react';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const { t } = useTranslation();

	const onToggle = async () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<div
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button
				onClick={onToggle}
				data-testid="sidebar-toggle"
				className={cls.collapsedBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>

			<div className={cls.items}>
				<AppLink
					to={RoutePath.main}
					theme={AppLinkTheme.SECONDARY}
					className={cls.item}
				>
					<MainIcon className={cls.icon} />

					<span className={cls.link}>
						{t('Главная')}
					</span>
				</AppLink>
				<AppLink
					to={RoutePath.about}
					theme={AppLinkTheme.SECONDARY}
					className={cls.item}
				>
					<AboutIcon className={cls.icon} />
					<span className={cls.link}>
						{t('О сайте')}
					</span>
				</AppLink>
			</div>

			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</div>
	);
};
