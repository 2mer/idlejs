import { Box, Button, Card, Code, Divider, Group, Stack } from '@mantine/core';
import SubmitHistoryGraph from './SubmitHistoryGraph';
import TaskInfo from './TaskInfo';

function SubmitCard({
	children,
	prompt,
	onSubmit,
	task,
	history,
	loading = false,
}) {
	return (
		<Card
			shadow='sm'
			p='lg'
			radius='md'
			withBorder
			task-type={task.id}
			className='Task'
		>
			<Group position='apart'>
				<Stack w='100%'>
					{/* header section */}
					<Stack w='100%'>
						<TaskInfo task={task} />
						{prompt}
					</Stack>

					<Card.Section>
						<Divider />
					</Card.Section>

					{/* input section */}
					<Stack>
						{children}
						<Group noWrap mt='md'>
							<Code style={{ padding: 0 }}>
								<Box
									sx={{
										position: 'relative',
										width: '50px',
										height: '36px',
									}}
								>
									<SubmitHistoryGraph history={history} />
								</Box>
							</Code>

							<Button
								variant='light'
								color='blue'
								fullWidth
								radius='md'
								onClick={onSubmit}
								loading={loading}
							>
								SUBMIT
							</Button>
						</Group>
					</Stack>
				</Stack>
			</Group>
		</Card>
	);
}

export default SubmitCard;
