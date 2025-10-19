import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './<FTName>.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface <FTName>Props {
	className?: string;
}

export const <FTName> = memo(({
	className,
}: <FTName>Props) => {
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.<FTName>, {}, [className])}>
			{t('<FTName>')}
		</div>
	);
});
