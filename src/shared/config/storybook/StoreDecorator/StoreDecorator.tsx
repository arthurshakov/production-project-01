import 'app/styles/index.scss';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { loginReducer } from 'features/AuthByUserName/model/slice/loginSlice';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slices/addCommentFormSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsCommentsReducer }
	from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { profileReducer } from '../../../../entities/Profile';
import { articleDetailsReducer }
	from '../../../../entities/Article/model/slice/articleDetailsSlice';

const defaultAsyncReducers: ReducersList = {
	loginForm: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	addCommentForm: addCommentFormReducer,
	articleDetailsComments: articleDetailsCommentsReducer,
};

export const StoreDecorator = (
	state: DeepPartial<StateSchema>,
	asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
	<StoreProvider
		initialState={state}
		asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
	>
		<StoryComponent />
	</StoreProvider>
);
