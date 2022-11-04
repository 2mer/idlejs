import {
	Badge,
	Button,
	Card,
	Divider,
	Group,
	HoverCard,
	Stack,
	Title,
} from '@mantine/core';
import { RotateClockwise } from 'tabler-icons-react';
import { createCurrencyBadges } from '../state/currency';

function SubmitCard({
	children,
	title,
	header,
	onSubmit,
	example,
	loading = false,

	cooldown,
	payout = undefined as any,
}) {
	return (
		<Card shadow='sm' p='lg' radius='md' withBorder>
			<Group position='apart'>
				<Stack w='100%'>
					<Stack w='100%'>
						<Group position='apart'>
							<HoverCard
								width='fit-content'
								shadow='md'
								withinPortal
								position='bottom-start'
							>
								<HoverCard.Target>
									<Title order={3}>{title}</Title>
								</HoverCard.Target>
								<HoverCard.Dropdown>
									{example}
								</HoverCard.Dropdown>
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
									{cooldown}
								</Badge>
								{payout && createCurrencyBadges(payout)}
							</Group>
						</Group>
						{header}
					</Stack>
					<Card.Section>
						<Divider />
					</Card.Section>
					<Stack>
						{children}
						<Button
							variant='light'
							color='blue'
							fullWidth
							mt='md'
							radius='md'
							onClick={onSubmit}
							loading={loading}
						>
							SUBMIT
						</Button>
					</Stack>
				</Stack>
			</Group>
		</Card>
	);
}

export default SubmitCard;
