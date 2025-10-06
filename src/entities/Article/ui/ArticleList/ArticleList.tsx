import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import cls from './ArticleList.module.scss';
import { Article, ArticleView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
	className?: string;
	articles: Article[];
	isLoading?: boolean;
	view?: ArticleView;
	target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => {
	return new Array(view === ArticleView.SMALL ? 9 : 3).fill(0).map((item, index) => (
		<ArticleListItemSkeleton key={index} view={view} className={cls.card} />
	));
};

export const ArticleList = memo(({
	className,
	articles,
	isLoading,
	target,
	view = ArticleView.SMALL,
}: ArticleListProps) => {
	const { t } = useTranslation();

	const renderArticle = (article: Article) => {
		return (
			<ArticleListItem
				article={article}
				view={view}
				key={article.id}
				className={cls.card}
				target={target}
			/>
		);
	};

	if (!isLoading && !articles.length) {
		return (
			<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
				<Text title={t('Статьи не найдены')} />
			</div>
		);
	}

	return (
		<div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
			{articles.length
				? articles.map(renderArticle)
				: null}

			{isLoading && getSkeletons(view)}
		</div>
	);
});
