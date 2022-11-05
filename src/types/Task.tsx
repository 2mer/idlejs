import { Money } from '../state/currency';

export default abstract class Task<P, K> {
	id: string = '';
	name: any = '';
	solution: K;
	prompt: P;
	example: any;
	reward: Money = [];

	submitDuration = 0;

	constructor() {
		this.prompt = this.generatePrompt();
		this.solution = this.solve(this.prompt);
	}

	abstract generatePrompt(): P;
	abstract solve(prompt: P): K;

	validate(form: any) {
		return false;
	}
}
