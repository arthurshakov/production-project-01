import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList }
	from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page/Page';
import { AddCommentForm } from 'features/AddCommentForm';
import { fetchCommentsByArticleId }
	from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments }
	from '../../model/slices/articleDetailsCommentsSlice';
import { ArticleDetails, ArticleList } from '../../../../entities/Article';
import { CommentList } from '../../../../entities/Comment';
import {
	getArticleCommentsIsLoading,
}	from '../../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { addCommentForArticle }
	from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
	articleDetailsPageRecommendationsReducer,
	getArticleRecommendations,
} from '../../model/slices/articleDetailsPageRecommendationsSlice';
import {
	getArticleRecommendationsIsLoading,
} from '../../model/selectors/recommendations';
import {
	fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{id: string}>();

	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	// const commentsError = useSelector(getArticleCommentsError);
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const recommednationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSendComment = useCallback((text: string) => {
		dispatch(addCommentForArticle(text));
	}, [dispatch]);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, [navigate]);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	});

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
				<Button
					theme={ButtonTheme.OUTLINE}
					onClick={onBackToList}
				>
					{t('Назад к списку')}
				</Button>

				<ArticleDetails id={id} />

				<Text
					size={TextSize.L}
					title={t('Рекомендуем')}
					className={cls.commentTitle}
				/>

				<ArticleList
					articles={recommendations}
					isLoading={recommednationsIsLoading}
					className={cls.recommendations}
					target="_blank"
				/>

				<Text
					size={TextSize.L}
					title={t('Комментарии')}
					className={cls.commentTitle}
				/>

				<AddCommentForm onSendComment={onSendComment} />

				<CommentList
					isLoading={commentsIsLoading}
					comments={comments}
				/>
			</Page>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
