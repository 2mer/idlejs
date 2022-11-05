import { Code } from '@mantine/core';
import { batch, useSignal } from '@preact/signals';
import { useState } from 'preact/hooks';
import { addReward } from '../state/currency';
import Task from '../types/Task';

export default function useTextTask({ generate, example }) {
	const [loading, setLoading] = useState(false);
	const [history, setHistory] = useState(Array.from({ length: 10 }).fill(0));
	const answer = useSignal('');
	const task = useSignal<Task<any, any>>(generate());

	return {
		answer,
		props: {
			history,
			task: task.value,
			loading,
			cooldown: task.value.submitDuration,
			title: task.value.name,
			prompt: (
				<Code block className='Prompt'>
					{task.value.prompt}
				</Code>
			),
			onSubmit: () => {
				setLoading(true);
				setTimeout(() => {
					const isValid = task.value.validate(answer.value);
					if (isValid) {
						addReward(task.value.reward);
					}

					setHistory((prev) => [
						isValid ? 1 : -1,
						...prev.slice(0, -1),
					]);

					batch(() => {
						task.value = generate();
						answer.value = '';
					});

					setLoading(false);
				}, task.value.submitDuration * 1_000);
			},
			example,
		},
	};
}
