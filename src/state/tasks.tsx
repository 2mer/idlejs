import tasks from '../tasks';
import { JSON_LOADER, localStorageSignal, STORE_PREFIX } from './store';

export interface ITaskEntry {
	id: keyof typeof tasks;
	state?: any;
}

export const taskStore = localStorageSignal({
	key: STORE_PREFIX + 'tasks',
	defaultValue: [] as ITaskEntry[],
	...JSON_LOADER,
});

export function addTask(task: ITaskEntry) {
	taskStore.value = [...taskStore.peek(), task];
}
