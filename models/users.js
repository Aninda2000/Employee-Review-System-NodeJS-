
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        required : true,
    },
    to : [     // i have to review whom
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
        }
    ],
    from : [    // recieved review from another people
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review',
        }
    ]

},{
    timestamps : true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;