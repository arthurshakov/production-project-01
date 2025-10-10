import { classNames } from 'shared/lib/classNames/classNames';
import {
	memo, MutableRefObject, ReactNode, UIEvent, useRef,
} from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { getUIScrollByPath, uiActions } from 'features/UI';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
	className?: string;
	children: ReactNode;
	onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
	const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
	const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

	useInfiniteScroll({
		triggerRef,
		wrapperRef,
		callback: onScrollEnd,
	});

	const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
		console.log('scroll');

		dispatch(uiActions.setScrollPosition({
			path: pathname,
			position: e.currentTarget.scrollTop,
		}));
	}, 500);

	useInitialEffect(() => {
		wrapperRef.current.scrollTop = scrollPosition;
	});

	return (
		<main
			ref={wrapperRef}
			className={classNames(cls.Page, {}, [className])}
			onScroll={onScroll}
			id={PAGE_ID}
		>
			{children}

			{onScrollEnd && <div ref={triggerRef} className={cls.trigger} />}
		</main>
	);
});
