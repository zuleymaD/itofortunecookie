//cargando modulo http
var http = require('http');
//cargando libreria path
var path = require('path'); 
//cargando la libreria mime
var mime = require('mime');
//cargando la libreria colores
var colors = require('colors');
var fs = require('fs');
 var cont = 0;

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
    var urlPath = req.url;
    console.log(`>url solicitada: ${urlPath}`.silly)
    if(urlPath == '/'){
        //genera una ruta hacia el index
        urlPath =path.resolve('./static/index.html');
        //res.end(`se sirve ${urlPath}`);
    }else{
        //genera una ruta dentro de static
        urlPath = path.resolve(config.STATIC_PATH + urlPath); 
        //res.end(`se sirve ${urlPath}`);
    }
    
    //extrayendo la extencion de lo que vamos a servir
    var extname = path.extname(urlPath);
    // res.end(`extencion a  servir ${extname }`);
    //seleccionar el content-type con base en el extname

    var contentType = mime.loock;
    
    fs.exists(urlPath, function(exists){
        if(!exists){
            //No existe
            res.writeHead(404, {
                'content-Type' : 'text/html'
            });
            res.end ('<h1>404 NOT FOUND.....   </h1>'); 
        }else{
            //Si existe
            //leemos el archivo y lo servimos
            // res.end(`${urlPath} existe`);
            fs.readFile(urlPath, function(err, content){
                if(err){
                    res.writeHead(500, {
                    'content-Type' : 'text/html'
                    });
                    res.end('<h1 style="color: red"> 500 ERROR</h1>')
                }else{
                    //si pudo leer
                    res.writeHead(200, {
                        'content-Type' : contentType
                    });
                    res.end(content);
                }
            })
            
        }
    })




    //     urlPath = `static/index.html`;
    //     fs.readFile(urlPath, 'utf8', function(err, content){
    //         if(err){
    //             throw err;
    //         }
    //         res.writeHead(
    //             200,
    //             {
    //                 'Content-Type': 'text/html',
    //                 'Server': 'Buho@0.0.2'
    //             }
    //         );
    //         cont++;

    //         content = content.replace('visita', cont.toString());
    //         res.end(content);
    //     });
    // } else {
    //     res.writeHead(
    //         200,
    //         {
    //             'Content-Type': 'text/html',
    //             'Server': 'Buho@0.0.2'
    //         }
    //     );
    //     res.end('<marquee><h1 style="color: orange">EN CONSTRUCCION!!!</h1></marquee>');
    
});
//poniendo a escuchar el server
server.listen(PORT, IP, function(){
    console.log(`>server escuchado en http://${IP}:${PORT}/`.info);
});