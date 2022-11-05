import {
	Button,
	Card,
	Divider,
	Grid,
	Group,
	Modal,
	Stack,
	Title,
} from '@mantine/core';
import {
	checkCurrency,
	createCurrencyBadges,
	getWallet,
	subtractPayment,
} from '../state/currency';
import shop from '../state/shop';

function TaskShopModal({ opened, onClose }) {
	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={<Title order={1}>Get more tasks</Title>}
			size='xl'
			padding='xl'
		>
			<Stack mt='xl'>
				<Grid columns={9}>
					{shop.map((entry) => {
						const disabled = !checkCurrency(
							getWallet(),
							entry.price
						);
						return (
							<Grid.Col span={3}>
								<Card shadow='sm' p='lg' radius='md' withBorder>
									{entry.info}
									<Card.Section mt='md' mb='md'>
										<Divider />
									</Card.Section>
									<Group noWrap>
										<Button
											color='green'
											variant='subtle'
											fullWidth
											rightIcon={
												<>
													{createCurrencyBadges(
														entry.price,
														{
															variant: disabled
																? 'outline'
																: 'filled',
														}
													)}
												</>
											}
											disabled={disabled}
											onClick={() => {
												subtractPayment(entry.price);
												entry.onPurchase();
											}}
										>
											Purchase
										</Button>
									</Group>
								</Card>
							</Grid.Col>
						);
					})}
				</Grid>
			</Stack>
		</Modal>
	);
}

export default TaskShopModal;
