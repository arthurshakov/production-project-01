import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
	className?: string;
	comments?: Comment[],
	isLoading?: boolean,
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
	const { t } = useTranslation();

	if (isLoading) {
		return (
			<div className={classNames(cls.CommentList, {}, [className])}>
				<CommentCard isLoading className={cls.comment} />
				<CommentCard isLoading className={cls.comment} />
				<CommentCard isLoading className={cls.comment} />
			</div>
		);
	}

	return (
		<div className={classNames(cls.CommentList, {}, [className])}>
			{
				comments?.length
				// commentlist
					? comments.map((comment) => (
						<CommentCard
							comment={comment}
							className={cls.comment}
							isLoading={isLoading}
							key={comment.id}
						/>
					))
					: <Text text={t('Комментарии отсутствуют')} />
			}
		</div>
	);
});
