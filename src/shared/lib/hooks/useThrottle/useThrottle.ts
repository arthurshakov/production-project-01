import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
	const throttleRef = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// useEffect(() => {
	// 	return () => {
	// 		if (timeoutRef.current) {
	// 			clearTimeout(timeoutRef.current);
	// 		}
	// 	};
	// });

	return useCallback((...args: any[]) => {
		if (!throttleRef.current) {
			callback(...args);
			throttleRef.current = true;

			timeoutRef.current = setTimeout(() => {
				throttleRef.current = false;
			}, delay);
		}
	}, [callback, delay]);
}
