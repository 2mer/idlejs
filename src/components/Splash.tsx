import { Button, Group, Stack, Title } from '@mantine/core';
import { ArrowRight } from 'tabler-icons-react';
import { addTask } from '../state/tasks';

function Splash() {
	return (
		<Stack>
			<Title order={1}>Welcome to IdleJS</Title>
			<Title order={4}>⚡️ Powered by Vite + Preact</Title>

			<Group position='right'>
				<Button
					color='green'
					variant='filled'
					rightIcon={<ArrowRight />}
					onClick={() => {
						addTask({ id: 'MATCH_TEXT' });
					}}
				>
					Begin
				</Button>
			</Group>
		</Stack>
	);
}

export default Splash;
