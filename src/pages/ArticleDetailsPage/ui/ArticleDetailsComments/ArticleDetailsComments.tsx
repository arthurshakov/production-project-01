import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { CommentList } from '../../../../entities/Comment';

interface ArticleDetailsCommentsProps {
	className?: string;
	id?: string;
}

export const ArticleDetailsComments = memo(
	({ className, id }: ArticleDetailsCommentsProps) => {
		const { t } = useTranslation();
		const comments = useSelector(getArticleComments.selectAll);
		const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
		// const commentsError = useSelector(getArticleCommentsError);
		const dispatch = useAppDispatch();

		const onSendComment = useCallback(
			(text: string) => {
				dispatch(addCommentForArticle(text));
			},
			[dispatch],
		);

		useInitialEffect(() => {
			dispatch(fetchCommentsByArticleId(id));
			// dispatch(fetchArticleRecommendations());
		});

		return (
			<VStack gap="16" max className={classNames('', {}, [className])}>
				<Text size={TextSize.L} title={t('Комментарии')} />

				<Suspense fallback={<Loader />}>
					<AddCommentForm onSendComment={onSendComment} />
				</Suspense>

				<CommentList isLoading={commentsIsLoading} comments={comments} />
			</VStack>
		);
	},
);
