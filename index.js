const express = require("express")
const app = express()

var v_carga = []
var v_panel = []
var v_baterias = []

app.get("/", (req, res) => {
	var template = require('./template.js')
	res.send(`<!DOCTYPE html>
	<html>
	<head>
		<title></title>
	</head>
	<body>
		<center>
			Voltaje carga: ${v_carga.toString()} <br>
			Voltaje panel: ${v_panel.toString()} <br>
			Voltaje baterias: ${v_baterias.toString()} <br>
		</center>

		<canvas id="myChart" width="400" height="400"></canvas>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
		<script>
		var ctx = document.getElementById("myChart").getContext('2d');

		var myLineChart = new Chart(ctx, {
			type: 'line',
			data: [1,2,3]
	})
		</script>
	</body>
	</html>`)
})

app.post("/api", (req, res) => {
	v_carga.push(req.body.v_carga)
	v_panel.push(req.body.v_panel)
	v_baterias.push(req.body.v_baterias)
	res.send("OK")
})

var port = process.env.PORT || 5000

app.listen(port, () => console.log("Escuchando en el puerto " + port))
