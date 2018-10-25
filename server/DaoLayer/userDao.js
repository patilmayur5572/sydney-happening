var Users = require('../Models/Users.js');

module.exports = {
    /*
    * use this function to find user by email id
    * the callback function returns user if found
    * error if db error or empty callback if not found
    */
    findUser: function (email, callback) {
        Users.findOne({email: email}, function (err, user) {
            if(err) {
                callback(err, null);
            }
            if(user) {
                callback(null, user);
            }
            else 
                callback();
        });
    },

    /*
    * Use this function to register user
    * @registerUser Json with details of user to register
    */
    registerUser: function (registerUser, callback) {
        registerUser.save(function (err, user) {
            if(err) {
                callback(err,null);
            }
            if(user) {
                callback(null, user);
            }
        });
    },

     /*
    * Use this function to register event
    * @eventDetails Json with details of user to register
    */
    registerToAttend: function(id, eventDetails, callback){
        Users.findByIdAndUpdate(id, {$push: eventDetails}, function(err, users) {
            if(err) {
                callback(err, null);
            }
            if(users) {
                callback(null, users);
            } 
        });
    },

    /*
    * Use this function to fetch events registered to by the user.
    * @id userId of the user whose registered event is being fetched. 
    */
    findUsersByEvents: function(id, callback){
        Users.findById(id, {"EventsRegistered": 1}, function(err, userEvents){
            if(err) {
                callback(err, null);
            }
            if(userEvents) {
                callback(null, userEvents.EventsRegistered);
            }
        });
    }
}
