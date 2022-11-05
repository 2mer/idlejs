import { Badge, Group, HoverCard, Title } from '@mantine/core';
import { RotateClockwise } from 'tabler-icons-react';
import { createCurrencyBadges } from '../state/currency';
import Task from '../types/Task';

function TaskInfo({ task }: { task: Task<any, any> }) {
	return (
		<Group position='apart'>
			<HoverCard
				width='fit-content'
				shadow='md'
				withinPortal
				position='bottom-start'
			>
				<HoverCard.Target>
					<Title order={3}>{task.name}</Title>
				</HoverCard.Target>
				<HoverCard.Dropdown>{task.example}</HoverCard.Dropdown>
			</HoverCard>

			<Group>
				<Badge
					leftSection={
						<RotateClockwise
							size={16}
							style={{ display: 'flex' }}
						/>
					}
				>
					{task.submitDuration}
				</Badge>
				{Boolean(task.reward?.length) &&
					createCurrencyBadges(task.reward)}
			</Group>
		</Group>
	);
}

export default TaskInfo;
