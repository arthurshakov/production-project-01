import { useTranslation } from 'react-i18next';
import { CSSProperties, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
	className?: string;
	src?: string;
	size?: number;
	alt?: string;
}

export const Avatar = ({
	className, src, size, alt,
}: AvatarProps) => {
	const { t } = useTranslation();

	const styles = useMemo<CSSProperties>(() => {
		return {
			width: size || 100,
			height: size || 100,
		};
	}, [size]);

	return (
		<img
			className={classNames(cls.Avatar, {}, [className])}
			alt={alt}
			src={src}
			style={styles}
		/>
	);
};
