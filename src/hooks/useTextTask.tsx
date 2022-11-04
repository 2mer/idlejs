import { Code, Stack } from '@mantine/core';
import { batch, useSignal } from '@preact/signals';
import { useState } from 'preact/hooks';
import { ArrowDown } from 'tabler-icons-react';
import { addPayout } from '../state/currency';

export default function useTextTask({ payout, generate }) {
	const [loading, setLoading] = useState(false);
	const [example] = useState(generate());
	const answer = useSignal('');
	const task = useSignal(generate());

	return {
		answer,
		props: {
			payout,
			loading,
			cooldown: task.value.submitDuration,
			header: <Code block>{task.value.hint}</Code>,
			onSubmit: () => {
				setLoading(true);
				setTimeout(() => {
					if (task.value.validate({ input: answer.value })) {
						addPayout(payout);
					}

					batch(() => {
						task.value = generate();
						answer.value = '';
					});

					setLoading(false);
				}, task.value.submitDuration * 1_000);
			},
			example: (
				<Stack align='center'>
					<Code block color='blue'>
						{example.hint}
					</Code>
					<ArrowDown />
					<Code block color='green'>
						{example.solution.input}
					</Code>
				</Stack>
			),
		},
	};
}
