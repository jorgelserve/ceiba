const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.set('view engine', 'pug') // register the template engine
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'))

var v_panel = []

app.get('/', (req, res) => {
	res.render('index')
})

app.post('/api', (req, res) => {
	v_panel.push({
		timestamp: new Date(),
		voltaje: req.headers.v_panel
	})
	res.send('OK')
})

app.post('/api/sensor', (req, res) => {
	res.send(v_panel)
	res.send('OK')
})

var port = process.env.PORT || 3000

app.listen(port, () => console.log('Escuchando en el puerto ' + port))
