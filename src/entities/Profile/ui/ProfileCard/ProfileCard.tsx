import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Currency, CurrencySelect } from '../../../../entities/Currency';
import { Country, CountrySelect } from '../../../../entities/Country';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
	className?: string;
	data?: Profile;
	error?: string;
	isLoading?: boolean;
	readonly?: boolean;
	onChangeFirstName?: (value?: string) => void;
	onChangeLastName?: (value?: string) => void;
	onChangeAge?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCurrency?: (currency: Currency) => void;
	onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = ({
	className,
	data,
	isLoading,
	error,
	readonly,
	onChangeFirstName,
	onChangeLastName,
	onChangeAge,
	onChangeCity,
	onChangeUsername,
	onChangeAvatar,
	onChangeCurrency,
	onChangeCountry,
}: ProfileCardProps) => {
	const { t } = useTranslation('profile');

	if (isLoading) {
		return (
			<HStack
				justify="center"
				max
				className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
			>
				<Loader />
			</HStack>
		);
	}

	if (error) {
		return (
			<HStack
				justify="center"
				max
				className={classNames(cls.ProfileCard, {}, [className, cls.error])}
			>
				<Text
					title={t('Ошибка при загрузке профиля')}
					text={t('Поробуйте обновить страницу')}
					theme={TextTheme.ERROR}
					align={TextAlign.CENTER}
				/>
			</HStack>
		);
	}

	const mods: Mods = {
		[cls.editing]: !readonly,
	};

	return (
		<VStack
			gap="8"
			max
			className={classNames(cls.ProfileCard, mods, [className])}
		>
			{data?.avatar && (
				<HStack justify="center" max>
					<Avatar src={data.avatar} alt="" />
				</HStack>
			)}

			<Input
				value={data?.first}
				placeholder={t('Ваше имя')}
				className={cls.input}
				onChange={onChangeFirstName}
				readonly={readonly}
				data-testid="ProfileCard.firstname"
			/>

			<Input
				value={data?.lastname}
				placeholder={t('Ваша фамилия')}
				className={cls.input}
				onChange={onChangeLastName}
				readonly={readonly}
				data-testid="ProfileCard.lastname"
			/>

			<Input
				value={data?.age}
				placeholder={t('Ваш возраст')}
				className={cls.input}
				onChange={onChangeAge}
				readonly={readonly}
				data-testid="ProfileCard.age"
			/>

			<Input
				value={data?.city}
				placeholder={t('Город')}
				className={cls.input}
				onChange={onChangeCity}
				readonly={readonly}
				data-testid="ProfileCard.city"
			/>

			<Input
				value={data?.username}
				placeholder={t('Введите имя пользователя')}
				className={cls.input}
				onChange={onChangeUsername}
				readonly={readonly}
				data-testid="ProfileCard.username"
			/>

			<Input
				value={data?.avatar}
				placeholder={t('Введите ссылку на аватар')}
				className={cls.input}
				onChange={onChangeAvatar}
				readonly={readonly}
				data-testid="ProfileCard.avatar"
			/>

			<CurrencySelect
				className={cls.input}
				value={data?.currency}
				onChange={onChangeCurrency}
				readonly={readonly}
				data-testid="ProfileCard.currency"
			/>

			<CountrySelect
				className={cls.input}
				value={data?.country}
				onChange={onChangeCountry}
				readonly={readonly}
				data-testid="ProfileCard.country"
			/>
		</VStack>
	);
};
