import { signal } from '@preact/signals';

const getItemFromLocalStorage = ({ key, defaultValue }) => {
	const val = window.localStorage.getItem(key);

	if (!val) return defaultValue;

	if (typeof defaultValue === 'number') {
		return +val;
	}

	return val;
};

export function localStorageSignal({ key, defaultValue }) {
	// initialize signal with local storage / default state
	const sig = signal(getItemFromLocalStorage({ key, defaultValue }));

	// update local storage on change
	sig.subscribe((val) => {
		window.localStorage.setItem(key, val);
	});

	return sig;
}

export const STORE_PREFIX = 'idlejs__';
