var ctx = document.getElementById("myChart").getContext('2d');
var myLineChart = new Chart(ctx, {
	type: 'line',
	data: [1,2,3]
})