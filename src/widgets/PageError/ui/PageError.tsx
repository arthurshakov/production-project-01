import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './PageError.module.scss';

interface PageErrorProps {
	className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
	const { t } = useTranslation();

	const reload = () => {
		// eslint-disable-next-line
		location.reload();
	};

	return (
		<div className={classNames(cls.PageError, {}, [className])}>
			{t('Произошла непредвиденная ошибка')}

			<button type="button" onClick={reload}>
				{t('Обновить страницу')}
			</button>
		</div>
	);
};
