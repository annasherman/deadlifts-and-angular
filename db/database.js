var mongoose = require('mongoose');

var connectionString = process.env.MONGOLAB_URI || process.env.DATABASE_URL;

mongoose.connect(connectionString);

mongoose.connection.on('connected', function (){
 console.log('connected');
})

mongoose.connection.on('error', function (error){
 console.log(error);
})

mongoose.connection.on('disconnected', function (){
 console.log('disconnected');
})
