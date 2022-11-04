import { Badge } from '@mantine/core';
import { batch } from '@preact/signals';
import { Atom } from 'tabler-icons-react';
import { localStorageSignal, STORE_PREFIX } from './store';

export interface ICurrencyEntry {
	id: string;
	amount: number;
}

class Currency {
	id: string;
	state: any;

	constructor({ id }) {
		this.id = id;
		this.state = localStorageSignal({
			key: STORE_PREFIX + id,
			defaultValue: 0,
		});
	}

	badge({ children }) {
		return (
			<Badge
				color='green'
				leftSection={<Atom size='16' style={{ display: 'flex' }} />}
			>
				{children}
			</Badge>
		);
	}

	create(amount: number) {
		return { id: this.id, amount };
	}
}

export const GREEN = new Currency({
	id: 'green_currency',
});

const CURRENCY = {
	green_currency: GREEN,
};

export function createCurrencyBadges(currencies: ICurrencyEntry[]) {
	currencies.sort((a, b) => {
		if (a.id > b.id) return 1;
		if (a.id < b.id) return -1;
		return 0;
	});

	return currencies.map((c) => {
		const Comp = CURRENCY[c.id].badge;
		return <Comp>{c.amount}</Comp>;
	});
}

export function addPayout(payout: ICurrencyEntry[]) {
	if (payout.length) {
		batch(() => {
			payout.forEach((entry) => {
				const currency: Currency = CURRENCY[entry.id];
				currency.state.value += entry.amount;
			});
		});
	}
}

export default CURRENCY;
