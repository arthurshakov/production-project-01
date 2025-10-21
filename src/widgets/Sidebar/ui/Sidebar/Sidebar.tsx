import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const { t } = useTranslation();
	const sidebarItemsList = useSelector(getSidebarItems);

	const onToggle = async () => {
		setCollapsed((prev) => !prev);
	};

	const itemsList = useMemo(() => {
		return sidebarItemsList.map((item) => (
			<SidebarItem
				item={item}
				collapsed={collapsed}
				key={item.path}
			/>
		));
	}, [collapsed, sidebarItemsList]);

	return (
		<aside
			data-testid="sidebar"
			className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
		>
			<Button
				onClick={onToggle}
				data-testid="sidebar-toggle"
				className={cls.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>

			<VStack role="navigation" gap="8" className={cls.items}>
				{ itemsList }
			</VStack>

			<div className={cls.switchers}>
				<ThemeSwitcher />
				<LangSwitcher short={collapsed} />
			</div>
		</aside>
	);
});
