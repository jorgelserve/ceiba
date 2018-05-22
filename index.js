const express = require("express")
const app = express()

var v_carga;
var v_panel;
var v_baterias;

app.get("/", (req, res) => {
  var template = `<center>
    Voltaje carga: ${v_carga} <br>
    Voltaje panel: ${v_panel} <br>
    Voltaje baterias: ${v_baterias} <br>
  </center>`
	res.send(template)
})

app.post("/api", (req, res) => {
	v_carga = req.body.v_carga || null
	v_panel = req.body.v_panel || null
  v_baterias = req.body.v_baterias || null
  res.send("OK")
})

var port = process.env.PORT || 5000

app.listen(port, () => console.log("Escuchando en el puerto " + port))
