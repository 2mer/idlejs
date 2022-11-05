import { Code, Stack } from '@mantine/core';
import { useState } from 'preact/hooks';
import { ArrowDown } from 'tabler-icons-react';

function TextTaskExample({ generate }) {
	const [task] = useState(generate());
	return (
		<Stack align='center'>
			<Code block color='blue'>
				{task.prompt}
			</Code>
			<ArrowDown />
			<Code block color='green'>
				{task.solution}
			</Code>
		</Stack>
	);
}

export default TextTaskExample;
