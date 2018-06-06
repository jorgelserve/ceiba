require('babel-polyfill')
require('chart.js')
const moment = require('moment')
const page = require('page')
var valor

page('/', loadData, (ctx, next) => {
	console.log(Array.from(ctx.data, (x) => x.voltaje))
	var chart = new Chart(document.getElementById('myChart').getContext('2d'), {
		// The type of chart we want to create
		type: 'line',

		// The data for our dataset
		data: {
				labels: Array.from(ctx.data, (x) => moment().startOf(x.timestamp).fromNow()),
				datasets: [{
						label: "Voltaje de pane solar",
						borderColor: 'rgb(0, 82, 28)',
						data: Array.from(ctx.data, (x) => x.voltaje)
				}]
		}
	})

	setTimeout(() => addData(chart), 1000)
})

page()

async function addData(chart) {
	try {
		var respuesta = await fetch('./api/sensor', {method: 'POST'}).then(res => res.json())
		chart.data.labels = Array.from(respuesta, (x) => moment().startOf(x.timestamp).fromNow())
    chart.data.datasets.forEach((dataset) => {
        dataset.data = Array.from(respuesta, (x) => x.voltaje)
    });
    chart.update();
	} catch (error) {
		console.error(error)
	}
}

async function loadData(ctx, next) {
	try {
		ctx.data = await fetch('./api/sensor', {method: 'POST'}).then(res => res.json())
		next()
	} catch (error) {
		console.error(error)
		next()
	}
	next()
}
