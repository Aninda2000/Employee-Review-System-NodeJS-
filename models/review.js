
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    review : {
        type : String,
        required : true,
    },
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    to : {  // recieved review from another people
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    }

},{
    timestamps : true,
});


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;