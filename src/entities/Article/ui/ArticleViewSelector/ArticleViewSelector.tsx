import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '../../model/types/article';

interface ArticleViewSelectorProps {
	className?: string;
	view: ArticleView;
	onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
	{
		view: ArticleView.SMALL,
		icon: ListIcon,
	},
	{
		view: ArticleView.BIG,
		icon: TiledIcon,
	},
];

export const ArticleViewSelector = memo((
	{ className, view, onViewClick }: ArticleViewSelectorProps,
) => {
	const { t } = useTranslation();

	const onClick = (newView: ArticleView) => () => {
		onViewClick?.(newView);
	};

	return (
		<div className={classNames(cls.ArticleViewSelector, {}, [className])}>
			{viewTypes.map((viewType) => (
				<Button
					theme={ButtonTheme.CLEAR}
					onClick={onClick(viewType.view)}
				>
					<Icon
						Svg={viewType.icon}
						className={classNames('', { [cls.notSelected]: viewType.view !== view })}
					/>
				</Button>
			))}
		</div>
	);
});
