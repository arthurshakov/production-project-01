import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'shared/ui/Page/Page';
import { DynamicModuleLoader, ReducersList }
	from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect }
	from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch }
	from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './ArticlesPage.module.scss';
import { ArticleList, ArticleView, ArticleViewSelector } from '../../../../entities/Article';
import { articlesPageActions, articlesPageReducer, getArticles }
	from '../../model/slices/articlesPageSlice';
import { fetchArticlesList }
	from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
	getArticlesPageIsLoading,
	getArticlesPageView,
}
	from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage }
	from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlesPageIsLoading);
	const view = useSelector(getArticlesPageView);

	useInitialEffect(() => {
		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList({ page: 1 }));
	});

	const onChangeView = useCallback((view: ArticleView) => {
		dispatch(articlesPageActions.setView(view));
	}, [dispatch]);

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(cls.ArticlesPage, {}, [className])}
			>
				<ArticleViewSelector view={view} onViewClick={onChangeView} />

				<ArticleList
					view={view}
					isLoading={isLoading}
					articles={articles}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
