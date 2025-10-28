import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppLink } from '@/shared/ui/AppLink';
import { VStack } from '@/shared/ui/Stack';
import { getRouteProfile } from '@/shared/const/router';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(
  ({ className, comment, isLoading }: CommentCardProps) => {
    const { t } = useTranslation();

    if (isLoading) {
      return (
        <VStack
          data-testid="CommentCard.Loading"
          gap="8"
          max
          className={classNames(cls.CommentCard, {}, [className, cls.loading])}
        >
          <div className={cls.header}>
            <Skeleton width={30} height={30} border="50%" />
            <Skeleton width={100} height={16} className={cls.username} />
          </div>
          <Skeleton width="100%" height={50} className={cls.text} />
        </VStack>
      );
    }

    if (!comment) {
      return null;
    }

    return (
      <VStack
        data-testid="CommentCard.Content"
        gap="8"
        max
        className={classNames(cls.CommentCard, {}, [className])}
      >
        <AppLink to={getRouteProfile(comment.user.id)} className={cls.header}>
          {comment.user.avatar && (
            <Avatar
              size={30}
              src={comment.user.avatar}
              className={cls.avatar}
            />
          )}

          <Text title={comment.user.username} className={cls.username} />
        </AppLink>

        <Text text={comment.text} className={cls.text} />
      </VStack>
    );
  },
);
