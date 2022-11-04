import './app.css';
import {
	ActionIcon,
	Box,
	Button,
	Card,
	Grid,
	Group,
	MantineProvider,
	Paper,
	Stack,
} from '@mantine/core';
import { GREEN } from './state/currency';
import tasks from './tasks';
import { Plus } from 'tabler-icons-react';

const unlockedTasks = [
	{ id: 'MATCH_TEXT', state: {} },
	{ id: 'REVERSE_TEXT', state: {} },
];

export function App() {
	return (
		<MantineProvider
			theme={{ colorScheme: 'dark' }}
			withGlobalStyles
			withNormalizeCSS
		>
			<Stack p='xl'>
				<Group>
					<GREEN.badge>{GREEN.state.value}</GREEN.badge>
				</Group>
				<Grid gutter='lg' w='100%' columns={15}>
					{unlockedTasks.map((task) => {
						const Comp = tasks[task.id];
						return (
							<Grid.Col span={3}>
								<Comp {...task.state} />
							</Grid.Col>
						);
					})}
					<Grid.Col span={3}>
						<Box
							sx={{
								display: 'flex',
								position: 'relative',
								height: '100%',
								width: '100%',
							}}
						>
							<Card
								shadow='sm'
								p='lg'
								radius='md'
								withBorder
								sx={{
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
									height: '100%',
									width: '100%',
									opacity: 0.3,
								}}
							>
								{''}
							</Card>
							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<ActionIcon
									size='xl'
									color='blue'
									variant='light'
								>
									<Plus />
								</ActionIcon>
							</Box>
						</Box>
					</Grid.Col>
				</Grid>
			</Stack>
		</MantineProvider>
	);
}
