import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
	InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string | number;
	onChange?: (value: string) => void;
	autofocus?: boolean;
	readonly?: boolean;
}

export const Input = memo(({
	className,
	value,
	onChange,
	placeholder = 'Введите текст',
	type = 'text',
	autofocus,
	readonly = false,
	...otherProps
}: InputProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const [caretPosition, setCaretPosition] = useState(0);
	const ref = useRef<HTMLInputElement>(null);

	const isCaretVisible = isFocused && !readonly;

	const mods: Mods = {
		[cls.readonly]: readonly,
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		setCaretPosition(e.target.value.length);
	};

	const onBlur = () => {
		setIsFocused(false);
	};

	const onFocus = () => {
		setIsFocused(true);
	};

	const onSelect = (e: any) => {
		setCaretPosition(e.target?.selectionStart ?? 0);
	};

	useEffect(() => {
		if (autofocus) {
			ref.current?.focus();
			setIsFocused(true);
		}
	}, [autofocus]);

	return (
		<div className={classNames(cls.InputWrapper, mods, [className])}>
			{
				placeholder
					&& (
						<div className={cls.placeholder}>
							{`${placeholder}>`}
						</div>
					)
			}

			<div className={cls.caretWrapper}>
				<input
					ref={ref}
					type={type}
					value={value}
					onChange={onChangeHandler}
					className={cls.input}
					onFocus={onFocus}
					onBlur={onBlur}
					onSelect={onSelect}
					readOnly={readonly}
					{...otherProps}
				/>
				{
					isCaretVisible && (
						<span
							className={cls.caret}
							style={{ left: `${caretPosition * 9.625}px` }}
						/>
					)
				}
			</div>
		</div>
	);
});
