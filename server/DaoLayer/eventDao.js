var Events = require('../models/Events.js');

module.exports = {
    
    /*
    * use this function to fetch all the events
    * the callback function returns events if present in DB
    * error if db error or empty callback 
    */
    getAllEvents: function (callback) {
        Events.find(function (err, events) {
            if(err) {
                callback(err, null);
            }
            if(events) {
                callback(null, events);
            }
        });
    },

    /*
    * use this function to find event by event id
    * the callback function returns event if found
    * error if db error or empty callback if not found
    */
    getEventByEventID: function (id, callback) {
        Events.findById({_id : id}, function (err, event) {
            if(err) {
                callback(err, null);
            }
            if(event) {
                callback(null, event);
            }
            else 
                callback();           
          });
    },

   /*
    * Use this function to add event
    * @newEvent Json with details of event to insert
    */
    addEvent: function(newEvent, callback) {        
        newEvent.save(function(err, event) {
            if(err) {
                callback(err, null);
            }
            if(event){
                callback(null, event);
            }            
        });
    },

    /*
    * use this function to delete event by event id
    * the callback function returns event if found
    * error if db error or empty callback if not found
    */
    deleteEvent: function(id, callback) {
        Events.findByIdAndRemove(id, function (err, event) {
            if(err) {
                callback(err, null);
            }
            if(event){
                callback(null, event);
            }  
        });
    },

    /*
    * use this function to update event by event id
    * the callback function returns event if found
    * error if db error or empty callback if not found
    */
    updateEvent: function(id, eventJson, callback) {
        Events.findByIdAndUpdate(id, {$set: eventJson}, function (err, event) {
            if(err) {
                callback(err, null);
            }
            if(event) {
                callback(null, event);
            }   
        });
    },

     /*
    * use this function to update available seats for the event by event id
    * the callback function returns event if found
    * error if db error or empty callback if not found
    */
    updateAvailableSeats: function(id, seatUpdate, callback) {
        Events.findByIdAndUpdate(id, {$inc : {"AvailableSeats": seatUpdate}}, function(err,events) {
            if(err) {
                callback(err, null);
            }
            if(events) {
                callback(null, events);
            } 
        });
    },
}