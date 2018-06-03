const express = require("express")
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json())
app.set('view engine', 'pug') // register the template engine
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

var v_carga = []
var v_panel = []
var v_baterias = []

app.get("/", (req, res) => {
	res.render('index')
})

app.post("/api", (req, res) => {
	v_carga.push(req.headers.v_carga)
	v_panel.push(req.headers.v_panel)
	v_baterias.push(req.headers.v_baterias)
	res.send("OK")
})

var port = process.env.PORT || 5000

app.listen(port, () => console.log("Escuchando en el puerto " + port))
