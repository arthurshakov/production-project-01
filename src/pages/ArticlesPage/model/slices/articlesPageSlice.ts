import {
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ARTICLE_VIEW_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { SortOrder } from '@/shared/types/sort';
import {
	Article,
	ArticleView,
	ArticleType,
	ArticleSortField,
} from '../../../../entities/Article';
import { ArticlesPageSchema } from '../types/articlesPageSchema';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';

const articlesAdapter = createEntityAdapter<Article>({
	selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
	(state) => state.articlesPage || articlesAdapter.getInitialState(),
);

const articlesPageSlice = createSlice({
	name: 'articlesPageSlice',
	initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
		isLoading: false,
		error: undefined,
		page: 1,
		hasMore: true,
		ids: [],
		entities: {},
		view: ArticleView.SMALL,
		_inited: false,
		limit: 9,
		sort: ArticleSortField.CREATED,
		search: '',
		order: 'asc',
		type: ArticleType.ALL,
	}),
	reducers: {
		setView: (state, action: PayloadAction<ArticleView>) => {
			state.view = action.payload;
			localStorage.setItem(ARTICLE_VIEW_LOCAL_STORAGE_KEY, action.payload);
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setOrder: (state, action: PayloadAction<SortOrder>) => {
			state.order = action.payload;
		},
		setSort: (state, action: PayloadAction<ArticleSortField>) => {
			state.sort = action.payload;
		},
		setSearch: (state, action: PayloadAction<string>) => {
			state.search = action.payload;
		},
		setType: (state, action: PayloadAction<ArticleType>) => {
			state.type = action.payload;
		},
		initState: (state) => {
			const view = localStorage.getItem(
				ARTICLE_VIEW_LOCAL_STORAGE_KEY,
			) as ArticleView;
			state.view = view;

			state.limit = view === ArticleView.BIG ? 4 : 9;
			state._inited = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArticlesList.pending, (state, action) => {
				state.error = undefined;
				state.isLoading = true;

				if (action.meta.arg.replace) {
					articlesAdapter.removeAll(state);
				}
			})

			.addCase(fetchArticlesList.fulfilled, (state, action) => {
				state.isLoading = false;
				articlesAdapter.addMany(state, action.payload);
				state.hasMore = action.payload.length >= state.limit;

				if (action.meta.arg.replace) {
					articlesAdapter.setAll(state, action.payload);
				} else {
					articlesAdapter.addMany(state, action.payload);
				}
			})

			.addCase(fetchArticlesList.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
	articlesPageSlice;
