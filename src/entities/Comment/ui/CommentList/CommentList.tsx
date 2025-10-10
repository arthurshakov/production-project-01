import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
	className?: string;
	comments?: Comment[],
	isLoading?: boolean,
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
	const { t } = useTranslation();

	if (isLoading) {
		return (
			<VStack gap="16" max className={classNames('', {}, [className])}>
				<CommentCard isLoading />
				<CommentCard isLoading />
				<CommentCard isLoading />
			</VStack>
		);
	}

	return (
		<VStack gap="16" max className={classNames('', {}, [className])}>
			{
				comments?.length
				// commentlist
					? comments.map((comment) => (
						<CommentCard
							comment={comment}
							isLoading={isLoading}
							key={comment.id}
						/>
					))
					: <Text text={t('Комментарии отсутствуют')} />
			}
		</VStack>
	);
});
