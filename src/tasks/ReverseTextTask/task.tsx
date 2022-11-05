import { v4 } from 'uuid';
import TextTaskExample from '../../components/TextTaskExample';
import { GREEN } from '../../state/currency';
import Task from '../../types/Task';

export default class ReverseTask extends Task<string, string> {
	id = 'revenge';
	name = 'Reverse';
	submitDuration = 5;
	example = (<TextTaskExample generate={() => new ReverseTask()} />);
	reward = [GREEN.create(2)];

	generatePrompt(): string {
		return v4();
	}

	solve(): string {
		return this.prompt.split('').reverse().join('');
	}

	validate(form: string): boolean {
		return form === this.solution;
	}
}
