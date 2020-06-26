var tools = require('./mercado_pago');
const bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');


const PORT = process.env.PORT || 3000;


var app = express();

app.use(bodyParser.urlencoded({ extended: false })); 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    
    var result= tools.generaMercadoPagoBoton(req.query).then((id)=>{
    	var datos= req.query;
    	datos.id=id;
    	datos.init_point=global.init_point;
    	res.render('detail', datos);
    });
    Promise.all([result]);

});
app.get('/pending', function (req, res) {
    
     console.log(JSON.stringify(req.body));
    res.render('pending');
});

app.get('/failure', function (req, res) {
    
    console.log(JSON.stringify(req.body));
    res.render('failure');
});
app.get('/success', function (req, res) {
    
    console.log(JSON.stringify(req.body));
    res.render('success');

});
app.post('/procesar-pago', function (req, res) {
    
    console.log(JSON.stringify(req.body));
    res.status(200).send("realizado");
    

});
app.post('/ipn', function (req, res) {
    console.log(JSON.stringify(req.body));
    
    res.status(200);
});



app.use(express.static('assets'));
 app.use(express.static('js'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/js', express.static(__dirname + '/js'));
 
app.listen(PORT);