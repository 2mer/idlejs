import { Badge } from '@mantine/core';
import { batch } from '@preact/signals';
import { Atom } from 'tabler-icons-react';
import { localStorageSignal, NUMBER_LOADER, STORE_PREFIX } from './store';

class Currency {
	id: string;
	state: any;

	constructor({ id }) {
		this.id = id;
		this.state = localStorageSignal({
			key: STORE_PREFIX + id,
			defaultValue: 0,
			...NUMBER_LOADER,
		});
	}

	badge({ children, ...rest }) {
		return (
			<Badge
				color='green'
				leftSection={<Atom size='16' style={{ display: 'flex' }} />}
				{...rest}
			>
				{children}
			</Badge>
		);
	}

	create(amount: number): ICurrencyEntry {
		return { id: this.id, amount } as unknown as ICurrencyEntry;
	}
}

export const GREEN = new Currency({
	id: 'green_currency',
});

const CURRENCY = {
	green_currency: GREEN,
};

export interface ICurrencyEntry {
	id: keyof typeof CURRENCY;
	amount: number;
}

export type Money = ICurrencyEntry[];

export function createCurrencyBadges(
	currencies: ICurrencyEntry[],
	BadgeProps = {}
) {
	currencies.sort((a, b) => {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	});

	return currencies.map((c) => {
		const Comp = CURRENCY[c.id].badge;
		return <Comp {...BadgeProps}>{c.amount}</Comp>;
	});
}

export function addReward(reward: Money) {
	if (reward.length) {
		batch(() => {
			reward.forEach((entry) => {
				const currency: Currency = CURRENCY[entry.id];
				currency.state.value += entry.amount;
			});
		});
	}
}

export function subtractPayment(payment: Money) {
	if (payment.length) {
		batch(() => {
			payment.forEach((entry) => {
				const currency: Currency = CURRENCY[entry.id];
				currency.state.value -= entry.amount;
			});
		});
	}
}

export function checkCurrency(payment: Money, price: Money) {
	return price.every(
		(priceEntry) =>
			priceEntry.amount <=
			(payment.find((paymentEntry) => paymentEntry.id === priceEntry.id)
				?.amount ?? 0)
	);
}

export function getWallet(): Money {
	let money;

	batch(() => {
		money = Object.values(CURRENCY).map((c) => ({
			id: c.id,
			amount: c.state.value,
		}));
	});

	return money;
}

export default CURRENCY;
