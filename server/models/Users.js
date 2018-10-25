const mongoose = require('mongoose');

//MongoDb schema for user.
const Users = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    FirstName: {
        type: String,
        require: true
    },
    LastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    IsAdmin: {
        type: Boolean,
    },
    EventsRegistered: {

    }

});

module.exports = mongoose.model('Users', Users);