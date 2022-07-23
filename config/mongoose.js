
const mongoose = require('mongoose');

// connect from mongodb
// mongoose.connect('mongodb://localhost:27017/Review-System');
mongoose.connect('mongodb+srv://aninda:aninda123@cluster0.75hqe.mongodb.net/?retryWrites=true&w=majority');

// aquire connection if it is succesful
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, 'error connecting to db'));

// up and running then print the message
db.once('open', function(){
    console.log("successfully connected to database!");
});

module.exports = db;