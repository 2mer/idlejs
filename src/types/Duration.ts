import { Ticker } from '@pixi/ticker';

export default class Duration {
	duration: number;
	currentDuration = 0;
	once: boolean;
	protected onComplete: () => void;

	constructor(duration: number, { onComplete = () => {}, once = true } = {}) {
		this.once = once;

		if (duration === 0) {
			onComplete();
		}

		this.duration = duration;
		this.onComplete = onComplete;

		this.tick = this.tick.bind(this);
	}

	tick(delta: number) {
		this.currentDuration += delta;
		if (this.currentDuration >= this.duration) {
			if (this.once) {
				this.currentDuration = this.duration;
			} else {
				this.currentDuration -= this.duration;
			}

			this.onComplete();
		}
	}

	get progress() {
		return this.currentDuration / this.duration;
	}

	get seconds() {
		return Math.floor(this.duration);
	}

	static subscribe(
		ticker: Ticker,
		{ timeout = 0, onComplete = () => {}, once = false }
	) {
		const handleTick = () => {
			duration.tick(ticker.deltaMS);
		};

		const duration = new Duration(timeout, {
			onComplete: () => {
				if (once) {
					ticker.remove(handleTick);
				}
				onComplete();
			},
			once,
		});

		ticker.add(handleTick);
	}
}
