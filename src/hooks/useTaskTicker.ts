import { Ticker } from '@pixi/ticker';

const ticker = new Ticker();

export default function useTaskTicker() {
	return ticker;
}
