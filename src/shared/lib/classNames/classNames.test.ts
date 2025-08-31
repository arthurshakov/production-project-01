import { classNames } from './classNames';

describe('classNames', () => {
	test('with only first parameter', () => {
		expect(classNames('someClass')).toBe('someClass');
	});

	test('with additional class', () => {
		expect(classNames('someClass', {}, ['class1', 'class2'])).toBe('someClass class1 class2');
	});

	test('with mods', () => {
		expect(classNames('someClass', { hovered: true, scrollable: true }, ['class1', 'class2']))
			.toBe('someClass class1 class2 hovered scrollable');
	});

	test('with mods with a false', () => {
		expect(classNames('someClass', { hovered: true, scrollable: false }, ['class1', 'class2']))
			.toBe('someClass class1 class2 hovered');
	});

	test('with mods with undefined', () => {
		expect(
			classNames('someClass', { hovered: true, scrollable: undefined }, ['class1', 'class2']),
		)
			.toBe('someClass class1 class2 hovered');
	});
});
