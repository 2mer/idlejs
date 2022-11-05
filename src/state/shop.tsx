import TaskInfo from '../components/TaskInfo';
import MatchTextTask from '../tasks/MatchTextTask';
import ReverseTextTask from '../tasks/ReverseTextTask';
import { GREEN, Money } from './currency';
import { addTask } from './tasks';

export enum ShopCategory {
	TASKS = 'tasks',
}

export interface IShopEntry {
	info: any;
	category: ShopCategory;
	onPurchase: () => void;
	price: Money;
}

export default [
	{
		info: <TaskInfo task={new MatchTextTask.task()} />,
		category: ShopCategory.TASKS,
		onPurchase() {
			addTask({ id: 'MATCH_TEXT' });
		},
		price: [GREEN.create(10)],
	},
	{
		info: <TaskInfo task={new ReverseTextTask.task()} />,
		category: ShopCategory.TASKS,
		onPurchase() {
			addTask({ id: 'REVERSE_TEXT' });
		},
		price: [GREEN.create(100)],
	},
] as IShopEntry[];
