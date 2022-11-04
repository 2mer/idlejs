import Duration from './Duration';

export default class Task<T> {
	id: string = '';
	hint: any = '';

	submitDuration = 0;

	constructor() {}

	validate(form: T) {
		return false;
	}
}
