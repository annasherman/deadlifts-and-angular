var mongoose = require('mongoose');


var connectionString = 'mongodb://localhost/workouts';
if (process.env.NODE_ENV === 'production') {
    connectionString = process.env.MONGOLAB_URI;
}


// var connectionString = 'mongodb://localhost/workouts';

//process.env.DATABASE_URL || process.env.MONGOLAB_URI;

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
