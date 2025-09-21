import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
	className?: string;
	value?: Country;
	readonly?: boolean;
	onChange?: (value: Country) => void;
}

const selectOptions = [
	{ value: Country.Russia, content: Country.Russia },
	{ value: Country.Armenia, content: Country.Armenia },
	{ value: Country.Belarus, content: Country.Belarus },
	{ value: Country.Kazakhstan, content: Country.Kazakhstan },
	{ value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(({
	className,
	value,
	onChange,
	readonly,
}: CountrySelectProps) => {
	const { t } = useTranslation();

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Country);
	}, [onChange]);

	return (
		<Select
			className={classNames('', {}, [className])}
			label={t('Укажите страну')}
			value={value}
			options={selectOptions}
			onChange={onChangeHandler}
			readonly={readonly}
		/>
	);
});
