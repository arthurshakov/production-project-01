import { LoginSchema } from 'features/AuthByUserName';
import { AddCommentFormSchema } from 'features/AddCommentForm';
import { UISchema } from 'features/UI';
import {
	AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
// import { NavigateOptions, To } from 'react-router-dom';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { CounterSchema } from '../../../../entities/Counter';
import { UserSchema } from '../../../../entities/User';
import { ProfileSchema } from '../../../../entities/Profile';
import { ArticleDetailsSchema } from '../../../../entities/Article';

export interface StateSchema {
	counter: CounterSchema;
	user: UserSchema;
	ui: UISchema;

	// Асинхронные редюсеры
	loginForm?: LoginSchema;
	profile?: ProfileSchema;
	articleDetails?: ArticleDetailsSchema;
	// articleDetailsComments?: ArticleDetailsCommentsSchema;
	// articleDetailsRecommendations?: ArticleDetailsPageRecommendationsSchema;
	addCommentForm?: AddCommentFormSchema;
	articlesPage?: ArticlesPageSchema;
	articleDetailsPage?: ArticleDetailsPageSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;

	// true - вмонтирован, false - демонтирован
	getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
	api: AxiosInstance;
	// navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
	rejectValue: T;
	extra: ThunkExtraArg;
	state: StateSchema;
}
