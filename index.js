const express = require("express")
const app = express()

var v_carga;

app.get("/", (req, res) => {
	res.send("Hola mundo")
})

app.post("/api", (req, res) => {
	v_carga = req.body.v_carga
	v_panel = req.body.v_paneÃlq 
})

var port = process.env.PORT || 5000

app.listen(port, () => console.log("Escuchando en el puerto " + port))
