import { v4 } from 'uuid';
import Duration from '../../types/Duration';
import Task from '../../types/Task';

export default class extends Task<{ input: string }> {
	solution: { input: string };

	constructor() {
		super();
		this.solution = { input: v4() };
		this.hint = this.solution.input;
		this.submitDuration = 5;
	}

	validate(form: { input: string }): boolean {
		return form.input === this.solution.input;
	}
}
