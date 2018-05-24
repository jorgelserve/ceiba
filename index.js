const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

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
			Voltaje carga: ${JSON.stringify(v_carga)} <br>
			Voltaje panel: ${JSON.stringify(v_panel)} <br>
			Voltaje baterias: ${JSON.stringify(v_baterias)} <br>
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
	v_carga.push(req.headers.v_carga)
	v_panel.push(req.headers.v_panel)
	v_baterias.push(req.headers.v_baterias)
	res.send("OK")
})

var port = process.env.PORT || 5000

app.listen(port, () => console.log("Escuchando en el puerto " + port))
