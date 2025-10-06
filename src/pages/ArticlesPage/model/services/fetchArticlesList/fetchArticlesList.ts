import { createAsyncThunk } from '@reduxjs/toolkit';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from '../../../../../entities/Article';
import {
	getArticlesPageLimit,
	getArticlesPageNum,
	getArticlesPageOrder,
	getArticlesPageSearch,
	getArticlesPageSort,
	getArticlesPageType,
} from '../../selectors/articlesPageSelectors';

interface fetchArticlesListProps {
	replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
	Article[],
	fetchArticlesListProps,
	ThunkConfig<string>
>(
	'articlesPage/fetchArticlesList',
	async (props, thunkApi) => {
		const { extra, rejectWithValue, getState } = thunkApi;
		const { replace = false } = props;
		const limit = getArticlesPageLimit(getState());
		const sort = getArticlesPageSort(getState());
		const order = getArticlesPageOrder(getState());
		const search = getArticlesPageSearch(getState());
		const page = getArticlesPageNum(getState());
		const type = getArticlesPageType(getState());

		try {
			addQueryParams({
				search,
				order,
				sort,
				type,
			});

			const response = await extra.api.get<Article[]>('/articles', {
				params: {
					_expand: 'user',
					_limit: limit,
					_page: page,
					_sort: sort,
					_order: order,
					type: type === ArticleType.ALL ? undefined : type,
					q: search,
				},
			});

			if (!response.data) {
				throw new Error();
			}

			return response.data;
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);

			return rejectWithValue('error');
		}
	},
);
