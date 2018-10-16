//importar as configurações do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(3000, function(){
    console.log('Servidor online');
})

//falando para o modulo socket.io onde ele deve ouvir
var io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexao com o websocket
io.on('connection', function(socket){
    console.log('usuario conectou')

    socket.on('disconnect', function(){
        console.log('Usuario desconectou');
    });

 //dialogo
    socket.on('msgParaServidor', function(data){
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );
        // participantes
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        }
    });
});