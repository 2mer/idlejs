import { useCallback, useEffect, useState } from 'preact/hooks';
import Duration from '../types/Duration';
import Task from '../types/Task';
import useTaskTicker from './useTaskTicker';

export default function useTaskGenerator<K = any, T extends Task<K> = Task<K>>(
	generator: () => T,
	dependencies = [],
	{ onComplete = () => {} } = {}
) {
	const ticker = useTaskTicker();
	const [currentTask, setCurrentTask] = useState<T>();
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		const task = generator();

		setCurrentTask(task);
	}, dependencies);

	const submit = useCallback(
		(form) => {
			if (currentTask) {
				if (currentTask?.validate(form)) {
					setDisabled(true);
					Duration.subscribe(ticker, { timeout: 5 });
				}
			}
		},
		[currentTask]
	);

	return { disabled: disabled || !currentTask, task: currentTask, submit };
}
