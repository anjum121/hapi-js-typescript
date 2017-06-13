import Hapi from 'hapi';

const server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port : 8000
});


server.route({
    method:'GET',
    path: '/',
    handler: (req, res) =>{
        res('It\'s working..' );
    }
});


server.start( err =>{
    if(err){
        console.error('Error was handled!');
        console.error(err);
    }
    console.info(`Server has started at its working: ${server.info}`);
});