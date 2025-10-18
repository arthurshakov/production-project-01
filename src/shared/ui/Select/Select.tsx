import { useTranslation } from 'react-i18next';
import { ChangeEvent, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
	value: string;
	content: string;
}

interface SelectProps {
	className?: string;
	label?: string;
	options?: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	readonly?: boolean;
}

export const Select = memo(({
	className, label, options, value, onChange, readonly,
}: SelectProps) => {
	const { t } = useTranslation();

	const optionsList = useMemo(() => {
		return options?.map((opt) => {
			return (
				<option
					className={cls.option}
					value={opt.value}
					key={opt.value}
				>
					{opt.content}
				</option>
			);
		});
	}, [options]);

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value);
	};

	return (
		<div className={classNames(cls.Wrapper, {}, [className])}>
			{label && (
				<span className={cls.label}>{ `${label}>` }</span>
			)}

			<select
				name=""
				id=""
				className={cls.select}
				value={value}
				onChange={onChangeHandler}
				disabled={readonly}
			>
				{optionsList}
			</select>
		</div>
	);
});
