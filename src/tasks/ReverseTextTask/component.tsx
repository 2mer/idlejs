import { TextInput } from '@mantine/core';
import Task from './task';
import SubmitCard from '../../components/SubmitCard';
import { GREEN } from '../../state/currency';
import useTextTask from '../../hooks/useTextTask';

const payout = [GREEN.create(2)];

export default function () {
	const { answer, props } = useTextTask({
		generate: () => new Task(),
		payout,
	});

	const { loading } = props;

	return (
		<SubmitCard title='Reverse' {...props}>
			<TextInput
				label='input'
				value={answer.value}
				disabled={loading}
				onChange={(e: any) => (answer.value = e.target.value)}
			/>
		</SubmitCard>
	);
}
