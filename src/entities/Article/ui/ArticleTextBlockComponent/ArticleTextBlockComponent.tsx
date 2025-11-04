import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
	className?: string;
	block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
	({ className, block }: ArticleTextBlockComponentProps) => {
		const { t } = useTranslation();

		return (
			<div
				className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
			>
				{block.title && <Text title={t(block.title)} className={cls.title} />}

				{block.paragraphs &&
					block.paragraphs.map((paragraph) => (
						<Text
							text={t(paragraph)}
							className={cls.paragraph}
							key={paragraph}
						/>
					))}
			</div>
		);
	},
);
