import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList }
	from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Text } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { fetchCommentsByArticleId }
	from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments }
	from '../../model/slices/articleDetailsCommentsSlice';
import { ArticleDetails } from '../../../../entities/Article';
import { CommentList } from '../../../../entities/Comment';
import { getArticleCommentsError, getArticleCommentsIsLoading }
	from '../../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { addCommentForArticle }
	from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
	const { t } = useTranslation('article-details');
	const { id } = useParams<{id: string}>();

	const comments = useSelector(getArticleComments.selectAll);
	const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
	const commentsError = useSelector(getArticleCommentsError);
	const dispatch = useAppDispatch();

	const onSendComment = useCallback((text: string) => {
		dispatch(addCommentForArticle(text));
	}, [dispatch]);

	useInitialEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	});

	if (!id) {
		return (
			<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				{t('Статья не найдена')}
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
				<ArticleDetails id={id} />

				<Text title={t('Комментарии')} />

				<AddCommentForm onSendComment={onSendComment} />

				<CommentList
					isLoading={commentsIsLoading}
					comments={comments}
				/>
			</div>
		</DynamicModuleLoader>
	);
};

export default memo(ArticleDetailsPage);
