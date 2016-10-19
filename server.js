//cargando modulo http
var http = require('http');
//cargando la libreria colores
var colors = require('colors');
//generar un tema
colors.setTheme({
silly : 'rainbow',
input : 'grey',
verbose : 'cyan',
prompt : 'grey',
info : 'green',
data : 'grey',
help : 'cyan',
warn : ['yellow','rainbow'],
debug : 'blue',
error : 'red',
achivement : 'rainbow'
});
//obteniendo configuraciones
var config = require('./config/config');
var PORT = config.PORT;
var IP = config.IP;    
//creando el server
var server = http.createServer(function(req, res){
    res.writeHead(200,{
        'content-type' : 'text/plain',
        'server' : 'Buho@0.0.0'
    });
    res.write('hola....');
    res.end();

});
//poniendo a escuchar el server
server.listen(PORT, IP, function(){
    console.log(`>server escuchado en http://${IP}:${PORT}/`.info);
});