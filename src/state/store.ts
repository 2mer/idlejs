import { signal } from '@preact/signals';

const getItemFromLocalStorage = ({ key, defaultValue, load }) => {
	const val = window.localStorage.getItem(key);

	if (!val) return defaultValue;

	return load(val);
};

export function localStorageSignal<T>({
	key,
	defaultValue,
	save = (x) => x,
	load = (x) => x,
}: {
	key: string;
	defaultValue: T;
	save?: (x) => any;
	load?: (x) => any;
}) {
	// initialize signal with local storage / default state
	const sig = signal<T>(getItemFromLocalStorage({ key, defaultValue, load }));

	// update local storage on change
	sig.subscribe((val) => {
		window.localStorage.setItem(key, save(val));
	});

	return sig;
}

export const STORE_PREFIX = 'idlejs__';

export const JSON_LOADER = {
	load: (v) => JSON.parse(v),
	save: (v) => JSON.stringify(v),
};

export const NUMBER_LOADER = {
	load: (v) => +v,
};
