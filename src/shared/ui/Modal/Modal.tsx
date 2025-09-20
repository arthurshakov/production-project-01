import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
	ReactNode, MouseEvent, useState, useRef,
	useEffect,
	useCallback,
	MutableRefObject,
} from 'react';
import cls from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	className?: string;
	children?: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = ({
	className, children, isOpen, onClose, lazy,
}: ModalProps) => {
	const [modalIsClosing, setModalIsClosing] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: modalIsClosing,
	};

	const closeHandler = useCallback(() => {
		if (onClose) {
			setModalIsClosing(true);

			timerRef.current = setTimeout(() => {
				onClose();
				setModalIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onContentClick = (e: MouseEvent) => {
		e.stopPropagation();
	};

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true);
		}
	}, [isOpen]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(cls.Modal, mods, [className])}>
				<div className={cls.overlay} onClick={closeHandler} />

				<div className={cls.content} onClick={onContentClick}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
