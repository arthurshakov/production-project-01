import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import cls from './ArticlesPageFilters.module.scss';
import {
	ArticleView,
	ArticleSortField,
	ArticleType,
} from '../../../../entities/Article';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import {
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
	getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

interface ArticlesPageFiltersProps {
	className?: string;
}

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const view = useSelector(getArticlesPageView);
	const sort = useSelector(getArticlesPageSort);
	const order = useSelector(getArticlesPageOrder);
	const search = useSelector(getArticlesPageSearch);
	const type = useSelector(getArticlesPageType);

	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }));
	}, [dispatch]);

	const debouncedFetchData = useDebounce(fetchData, 500);

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeOrder = useCallback((newOrder: SortOrder) => {
		dispatch(articlesPageActions.setOrder(newOrder));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeSort = useCallback((newSort: ArticleSortField) => {
		dispatch(articlesPageActions.setSort(newSort));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	const onChangeSearch = useCallback((search: string) => {
		dispatch(articlesPageActions.setSearch(search));
		dispatch(articlesPageActions.setPage(1));
		debouncedFetchData();
	}, [dispatch, debouncedFetchData]);

	const onChangeType = useCallback((value: ArticleType) => {
		dispatch(articlesPageActions.setType(value));
		dispatch(articlesPageActions.setPage(1));
		fetchData();
	}, [dispatch, fetchData]);

	return (
		<div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
			<div className={cls.sortWrapper}>
				<ArticleSortSelector
					order={order}
					sort={sort}
					onChangeOrder={onChangeOrder}
					onChangeSort={onChangeSort}
				/>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />
			</div>

			<Card className={cls.search}>
				<Input placeholder={t('Поиск')} value={search} onChange={onChangeSearch} />
			</Card>

			<ArticleTypeTabs
				onChangeType={onChangeType}
				value={type}
				className={cls.tabs}
			/>
		</div>
	);
});
