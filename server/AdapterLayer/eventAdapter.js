var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Events = require('../models/Events.js');
var eventDao = require('../DaoLayer/eventDao');
var userDao = require('../DaoLayer/userDao');
var checkForToken = require('../config/verifyToken');
var seatDecrease = -1;

// this route will be used to fetch all events
router.get('/getAllEvents', checkForToken.verifyToken, function(req, res, next) {  
  	eventDao.getAllEvents(function(err, events) {
    	if (err) {
      		return res.status(500).json({error: "Error while fething the events, please try again"})
    	}
    	if(events) {
      		return res.status(200).json(events);
    	}
  	});    
});

// this route will be used to fetch specific event by EventID
router.get('/getEvent/:_id', checkForToken.verifyToken, function(req, res, next) {
    eventDao.getEventByEventID(req.params._id ,function(err, event){
        if (err) {
        	return res.status(500).json({error: "Error while fething the event, please try again"})
        }
        if(event) {
        	return res.status(200).json(event);
        }
    });  
});

// this route will be used to Add New Event
router.post('/addEvent', checkForToken.verifyToken, function(req, res, next) {
    const newEvent = new Events({
        _id : new mongoose.Types.ObjectId(),
        EventName : req.body.EventName,
        EventVenue : req.body.EventVenue,
        EventDate : req.body.EventDate,
        EventTime : req.body.EventTime,
        AvailableSeats : req.body.AvailableSeats,
        CreatedBy : req.body.CreatedBy
    });
    eventDao.addEvent(newEvent, function(err, event){
        if(err) {
        	return res.status(500).json({error: "Error while adding the event, please try again"});
        }
        if(event) {
        	return res.status(200).json({message: "Event created successfully"});
        }
    })
});

// this route will be used to Delete existing event
router.delete('/deleteEvent/:_id', checkForToken.verifyToken, function(req, res, next) {
  	eventDao.deleteEvent({_id: req.params._id},function (err, event) {
    	if (err) {
      		return res.status(500).json({error: "Error while deleting the event, please try again"});
    	}
    	if(event) {
      		return res.status(200).json({message: "Event deleted"});
    	}    
  	});
});

// this route will be used to Update existing event
router.patch('/updateEvent', checkForToken.verifyToken,function(req, res, next) {
	//create json to save the updated event
	eventJson = new Events({
        EventName : req.body.EventName,
        EventVenue : req.body.EventVenue,
        EventDate : req.body.EventDate,
        EventTime : req.body.EventTime,
        AvailableSeats : req.body.AvailableSeats,
        CreatedBy : req.body.CreatedBy
    });
  	eventDao.updateEvent(req.body._id , eventJson, function (err, event) {
		if (err) {
			return res.status(500).json({error: "Error while updating the event, please try again"});
		}
		if(event) {
			return res.status(200).json({message: "Event updated successfully"});
		}    
  	});
});


// this route will be used to register a user to particular event 
router.post('/registerToAttend', checkForToken.verifyToken, function(req,res, next){
	//first check if seats are available, someone else may book at the same time. 
	eventDao.getEventByEventID(req.body.eventID, function(err, event){
		if(err){
			return res.status(500).json({error: "Error finding Event to register."});
		}
		if(event) {
			if(event.AvailableSeats < 0) {
				//No available seats, inform user. 
				return res.status(500).json({error: "Sorry, no seats available"});
			}
			else {          
				//Decrease the number of seats available by 1.
				eventDao.updateAvailableSeats(event._id, seatDecrease, function(err,events) {
					if(err) {        
						return res.status(500).json({error: "Error registering user to event, please try again"});
					}
					if(events) {
						var eventDetails = {
							"EventsRegistered": [{
								"EventID": events._id,
								"EventName": events.EventName
							}]
						}
						userDao.registerToAttend(req.body.userID, eventDetails, function(err, users) {
							if(err) {                  
								//since the register to user function has failed, increment the seat to original.
								eventDao.updateAvailableSeats(event._id, 1);
								return res.status(500).json({error: "Error registering user to event, please try again"});
							}
							if(users) {
								return res.status(200).json({message: "User registered to event successfully"});
							}
						});
					}
				});
			}
		}
	})
});

// this route will be used to retireve the events registered by user.
router.post('/getUserEvents', checkForToken.verifyToken, function(req, res, nex) {
  	userDao.findUsersByEvents(req.body.userID, function(err, userEvents){
		if(err) {
			return res.status(500).json({error: "There was error fetching user events"});
		}
		if(userEvents) {      
			return res.status(200).json(userEvents);
		}
	})
});

module.exports = router;