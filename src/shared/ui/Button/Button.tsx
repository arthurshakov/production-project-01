import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';

export enum ButtonTheme {
	CLEAR = 'clear',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
	M = 'size-m',
	L = 'size-l',
	XL = 'size-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
	const {
		className, theme, children, square, size = ButtonSize.M, ...otherProps
	} = props;

	const mods: Record<string, boolean> = {
		[cls.square]: square,
	};

	return (
		<button
			type="button"
			className={classNames(cls.Button, mods, [cls[theme], className, cls[size]])}
			{...otherProps}
		>
			{ children }
		</button>
	);
};
