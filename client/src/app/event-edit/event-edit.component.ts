import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from '../services/toastr.service'; //show error or success message

@Component({
	selector: 'app-event-edit',
	templateUrl: './event-edit.component.html',
	styleUrls: ['./event-edit.component.css']
})

//Component class for the Edit event page.
export class EventEditComponent implements OnInit {

	eventID: string; //Contains the event id of the event being edited
	event: Event; //This would be used to hold the data of existing event
	isBusy:boolean= false; //prevent multiple submits of form, once user sends request becomes true until server response.

	constructor(private eventService : EventService, private router : ActivatedRoute, 
		private showMessage:ToastrService,private route:Router) { }
	
	ngOnInit() {
		this.getEvent(this.router.queryParams.subscribe(params => {
			this.eventID = params['eventID']})
		);
	}

	//get the event to be edited.
	getEvent(eventID){
		this.eventService.getEvent(this.eventID).subscribe(event=> {      
			this.event = event;
		});
	}

	/*
	* get form data and call server API to update the event
	* can be only be used by admin IDs
	*/
	updateEvent(eventID, eventData) {
		this.isBusy = true;
		//event details fetched from the form
		var eventInfo = {
			_id: eventID,
			EventName: eventData.value.eventName,
			EventVenue: eventData.value.eventVenue,
			EventDate: this.getFormattedDate(eventData.value.eventDate),
			EventTime: this.getFormattedTime(eventData.value.eventTime),
			AvailableSeats: eventData.value.availableSeats,
			CreatedBy: localStorage.getItem('email')
		};

		this.eventService.updateEvent(eventID,eventInfo).subscribe(event => {
			this.showMessage.showSuccess("Event updated successfully");
			this.route.navigate(["/dashboard"]);
			this.isBusy = false;
		}, err => {
			this.isBusy = false;
			this.showMessage.showError(err.error); //show message that update event failed.
		});
	}

	//Get the date in day-month-year format
	getFormattedDate(date) {
		var formattedDate = new Date(date)
		var day = formattedDate.getDate();
		var month = formattedDate.getMonth() + 1;
		var year = formattedDate.getFullYear();
		return day + "-" + month + "-" + year
	}

	//Get the time in hours:minutes format
	getFormattedTime(time) {
		var hours = time.getHours();
		var mins = time.getMinutes();
		var seconds = time.getSeconds();
		return hours + ":" + mins;  
	}
}
