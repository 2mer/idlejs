import { TextInput } from '@mantine/core';
import Task from './task';
import SubmitCard from '../../components/SubmitCard';
import useTextTask from '../../hooks/useTextTask';
import TextTaskExample from '../../components/TextTaskExample';

const generate = () => new Task();

export default function () {
	const { answer, props } = useTextTask({
		generate,
		example: <TextTaskExample generate={generate} />,
	});

	const { loading } = props;

	return (
		<SubmitCard {...props}>
			<TextInput
				label='input'
				value={answer.value}
				disabled={loading}
				onChange={(e: any) => (answer.value = e.target.value)}
			/>
		</SubmitCard>
	);
}
