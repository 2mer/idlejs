import { v4 } from 'uuid';
import Duration from '../../types/Duration';
import Task from '../../types/Task';

export default class extends Task<{ input: string }> {
	solution: { input: string };

	constructor() {
		super();

		const gen = v4();

		this.solution = { input: gen.split('').reverse().join('') };
		this.hint = gen;
		this.submitDuration = 5;
	}

	validate(form: { input: string }): boolean {
		return form.input === this.solution.input;
	}
}
