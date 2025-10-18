import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/Text/Text';
import {
	getArticlesPageError,
	getArticlesPageIsLoading,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { ArticleList } from '../../../../entities/Article';

interface ArticleInfiniteListProps {
	className?: string;
}

export const ArticleInfiniteList = memo(({ className }: ArticleInfiniteListProps) => {
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const error = useSelector(getArticlesPageError);
	const view = useSelector(getArticlesPageView);
	const { t } = useTranslation();

	if (error) {
		return (<Text text={t('Ошибка при загрузке статей')} />);
	}

	return (
		<ArticleList
			view={view}
			isLoading={isLoading}
			articles={articles}
			className={className}
		/>
	);
});
