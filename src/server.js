import Hapi from 'hapi';
import Boom  from 'boom';
import mongoose from 'mongoose';
import glob from 'glob';
import path from 'path';
import secret from './config/';
import hapiAuthJWT  from 'hapi-auth-jwt';


const server = new Hapi.Server();
const dbURL = 'mongodb://localhost:27017/hapi-app'

server.connection({
    host: 'localhost',
    port : 8000
});

server.register(hapiAuthJWT, (error)=>{

    if(error){
        throw error
    }

    server.auth.strategy('jwt', 'jwt', {
        key: secret,
        verifyOptions: {
            algorithms : ['HS256']
        }
    });

    glob.sync('src/**/routes/*.js', {
        root : __dirname
    }).forEach( file => {
        const route = require(path.join(__dirname, file));
         server.route(route);
    });

});


server.start( err =>{
    if(err){
        console.error('Error was handled!');
        console.error(err);
    }
    console.info(`Server has started at its working: ${server.info}`);

    mongoose.connect(dbURL, {}, (error)=>{
        if(error){
            throw error;
        }
    });


});