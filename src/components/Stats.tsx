import { Group } from '@mantine/core';
import { createCurrencyBadges, getWallet } from '../state/currency';

function Stats() {
	return <Group>{createCurrencyBadges(getWallet())}</Group>;
}

export default Stats;
