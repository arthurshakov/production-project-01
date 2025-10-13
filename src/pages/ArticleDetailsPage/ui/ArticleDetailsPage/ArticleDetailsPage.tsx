import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList }
	from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { VStack } from 'shared/ui/Stack';
import { Page } from 'widgets/Page/Page';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { ArticleDetails } from '../../../../entities/Article';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{id: string}>();

	// const comments = useSelector(getArticleComments.selectAll);
	// const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	// const commentsError = useSelector(getArticleCommentsError);
	// const dispatch = useAppDispatch();

	// const onSendComment = useCallback((text: string) => {
	// 	dispatch(addCommentForArticle(text));
	// }, [dispatch]);

	// useInitialEffect(() => {
	// 	dispatch(fetchCommentsByArticleId(id));
	// 	// dispatch(fetchArticleRecommendations());
	// });

	if (!id) {
		return (
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</Page>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<VStack gap="16" max>
					<ArticleDetailsPageHeader />

					<ArticleDetails id={id} />

					<ArticleRecommendationsList />

					<ArticleDetailsComments id={id} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
