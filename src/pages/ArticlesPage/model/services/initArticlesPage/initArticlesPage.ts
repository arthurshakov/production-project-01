import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { SortOrder } from 'shared/types';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { ArticleSortField, ArticleType } from '../../../../../entities/Article';

export const initArticlesPage = createAsyncThunk<
	void,
	URLSearchParams,
	ThunkConfig<string>
>(
	'articlesPage/initArticlesPage',
	async (searchParams, thunkApi) => {
		const { getState, dispatch } = thunkApi;
		const inited = getArticlesPageInited(getState());

		if (!inited) {
			const orderFromUrl = searchParams.get('order') as SortOrder;
			const searchFromUrl = searchParams.get('search');
			const sortFromUrl = searchParams.get('sort') as ArticleSortField;
			const typeFromUrl = searchParams.get('type') as ArticleType;

			if (orderFromUrl) {
				dispatch(articlesPageActions.setOrder(orderFromUrl));
			}

			if (searchFromUrl) {
				dispatch(articlesPageActions.setSearch(searchFromUrl));
			}

			if (sortFromUrl) {
				dispatch(articlesPageActions.setSort(sortFromUrl));
			}

			if (typeFromUrl) {
				dispatch(articlesPageActions.setType(typeFromUrl));
			}

			dispatch(articlesPageActions.initState());
			dispatch(fetchArticlesList({}));
		}
	},
);
