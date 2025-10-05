import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { DynamicModuleLoader, ReducersList }
	from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect }
	from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch }
	from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSearchParams } from 'react-router-dom';
import cls from './ArticlesPage.module.scss';
import { ArticleList } from '../../../../entities/Article';
import { articlesPageReducer, getArticles }
	from '../../model/slices/articlesPageSlice';
import { getArticlesPageIsLoading, getArticlesPageView }
	from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage }
	from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

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
	const [searchParams] = useSearchParams();

	useInitialEffect(() => {
		dispatch(initArticlesPage(searchParams));
	});

	const onLoadNextPart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<Page
				onScrollEnd={onLoadNextPart}
				className={classNames(cls.ArticlesPage, {}, [className])}
			>
				<ArticlesPageFilters />

				<ArticleList
					view={view}
					isLoading={isLoading}
					articles={articles}
					className={cls.list}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticlesPage);
