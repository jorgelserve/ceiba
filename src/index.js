require('babel-polyfill')
require('chart.js')
var valor

async function init() {
	try {
		valor = await fetch('./api/sensor', {method: 'POST'}).then(res => res.json())
	} catch (error) {
		console.error(error)
	}
	console.log(valor)

	var chart = new Chart(document.getElementById('myChart').getContext('2d'), {
	    // The type of chart we want to create
	    type: 'line',

	    // The data for our dataset
	    data: {
	        labels: ["January", "February", "March", "April", "May", "June", "July"],
	        datasets: [{
	            label: "Voltaje de pane solar",
	            borderColor: 'rgb(0, 82, 28)',
	            data: [0, 10, 5, 2, 20, 30, 45],
	        }]
	    }
	})
}

init()
