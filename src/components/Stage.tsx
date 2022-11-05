import { ActionIcon, Box, Card, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from 'tabler-icons-react';
import { taskStore } from '../state/tasks';
import tasks from '../tasks';
import Splash from './Splash';
import TaskShopModal from './TaskShopModal';

function Stage() {
	const [shopOpened, shopHandlers] = useDisclosure(false);

	const availableTasks = taskStore.value;

	return (
		<>
			<Grid gutter='lg' w='100%' columns={15}>
				{availableTasks.length ? (
					<>
						{availableTasks.map((task) => {
							const Comp = tasks[task.id].component;
							return (
								<Grid.Col xs={7} sm={5} lg={4} xl={3}>
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
										onClick={shopHandlers.open}
									>
										<Plus />
									</ActionIcon>
								</Box>
							</Box>
						</Grid.Col>
					</>
				) : (
					<Grid.Col span={3}>
						<Card
							shadow='sm'
							p='lg'
							radius='md'
							withBorder
							data-ctype='splash'
						>
							<Splash />
						</Card>
					</Grid.Col>
				)}
			</Grid>

			{/* modals */}
			<TaskShopModal opened={shopOpened} onClose={shopHandlers.close} />
		</>
	);
}

export default Stage;
