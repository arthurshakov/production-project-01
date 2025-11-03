const interfaceConst = 'interface';

module.exports = (componentName) => `import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './${componentName}.module.scss';

${interfaceConst} ${componentName}Props {
	className?: string;
}

export const ${componentName} = memo((props: ${componentName}Props) => {
	const { className } = props;
	const { t } = useTranslation();

	return (
		<div className={classNames(cls.${componentName}, {}, [className])}>
			{t('${componentName}')}
		</div>
	);
});
`;
