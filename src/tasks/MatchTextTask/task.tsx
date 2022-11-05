import { v4 } from 'uuid';
import TextTaskExample from '../../components/TextTaskExample';
import { GREEN } from '../../state/currency';
import Task from '../../types/Task';

export default class MatchTask extends Task<string, string> {
	id = 'match';
	name = 'Match';
	submitDuration = 1;
	example = (<TextTaskExample generate={() => new MatchTask()} />);
	reward = [GREEN.create(50)];

	generatePrompt(): string {
		return v4();
	}

	solve(): string {
		return this.prompt;
	}

	validate(form: string): boolean {
		return form === this.solution;
	}
}
