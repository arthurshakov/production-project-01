import { useTranslation } from 'react-i18next';
import { ChangeEvent, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
	value: T;
	content: string;
}

interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOption<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Select = <T extends string>({
	className,
	label,
	options,
	value,
	onChange,
	readonly,
}: SelectProps<T>) => {
	const { t } = useTranslation();

	const optionsList = useMemo(() => {
		return options?.map((opt) => {
			return (
				<option className={cls.option} value={opt.value} key={opt.value}>
					{opt.content}
				</option>
			);
		});
	}, [options]);

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T);
	};

	return (
		<div className={classNames(cls.Wrapper, {}, [className])}>
			{label && <span className={cls.label}>{`${label}>`}</span>}

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
};
