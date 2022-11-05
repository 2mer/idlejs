import { useMemo } from 'preact/hooks';
import { Line } from 'react-chartjs-2';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

const options = {
	maintainAspectRatio: false,
	elements: {
		point: {
			radius: 0,
		},
	},
	plugins: { legend: { display: false } },
	scales: {
		x: {
			type: 'linear',
			display: false,
			suggestedMin: 0,
			suggestedMax: 10,
		},
		y: {
			type: 'linear',
			display: false,
			suggestedMin: -1,
			suggestedMax: 1,
		},
	},
};

// const plugins = [
// 	{
// 		id: 'custom-color',
// 		beforeRender: function (x, options) {
// 			var dataset = x.data.datasets[0];
// 			var yScale = x.scales.y;
// 			var yPos = yScale.getPixelForValue(0);

// 			var gradientFill = x.ctx.createLinearGradient(0, 0, 0, x.height);
// 			gradientFill.addColorStop(0, 'green');
// 			gradientFill.addColorStop(yPos / x.height - 0.01, 'green');
// 			gradientFill.addColorStop(yPos / x.height + 0.01, 'red');
// 			gradientFill.addColorStop(1, 'red');

// 			console.log(x, dataset);

// 			var model =
// 				x.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].dataset
// 					._model;
// 			model.backgroundColor = gradientFill;
// 		},
// 	},
// ];

function SubmitHistoryGraph({ history }) {
	const dataMemo = useMemo(() => {
		return {
			datasets: [
				{
					label: 'My First dataset',
					borderColor: 'rgba(255,255,255,0.4)',
					borderWidth: 2,
					data: history.map((v, index) => ({ x: index, y: v })),
					fill: {
						target: 'origin',
						above: 'rgba(0, 255, 0, 0.2)', // Area will be red above the origin
						below: 'rgba(255, 0, 0, 0.2)', // And blue below the origin
					},
				},
			],
		};
	}, [history]);

	// @ts-ignore
	return <Line options={options} data={dataMemo} />;
	// return <Line plugins={plugins} options={options} data={dataMemo} />;
}

export default SubmitHistoryGraph;
