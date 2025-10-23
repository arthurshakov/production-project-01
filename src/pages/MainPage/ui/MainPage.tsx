import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { Page } from '@/widgets/Page';
import { Counter } from '@/entities/Counter';

const MainPage = () => {
	const { t } = useTranslation();
	const [value, setValue] = useState('');

	const onChange = (val: string) => {
		setValue(val);
	};

	return (
		<Page>
			{t('Главная')}
			<Counter />
			<Input onChange={onChange} value={value} />
		</Page>
	);
};

export default MainPage;
