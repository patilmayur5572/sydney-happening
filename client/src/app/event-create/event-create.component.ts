import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';
import { ToastrService } from '../services/toastr.service'; //show error or success message

@Component({
	selector: 'app-event-create',
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.css']
})

//Component class for the creat event page
export class EventCreateComponent implements OnInit {

	constructor(private eventService : EventService,private router: Router,private showMessage:ToastrService) { }

	isBusy:boolean= false; //prevent multiple submits of form, once user sends request becomes true until server response.

	ngOnInit() {
	}

	/*
	* This event is used to create a new event by getting data in the form.
	* After creating the event, navigate to dashboard. 
	*/
	addEvent(eventData) {
		this.isBusy = true;
		//get the event data in form.
		var eventInfo = {
			EventName: eventData.value.eventName,
			EventVenue: eventData.value.eventVenue,
			EventDate: this.getFormattedDate(eventData.value.eventDate),
			EventTime: this.getFormattedTime(eventData.value.eventTime),
			AvailableSeats: eventData.value.availableSeats,
			CreatedBy: localStorage.getItem('email')
		};
		this.eventService.addEvent(eventInfo).subscribe(event => {
			this.router.navigate(['/dashboard']);
			this.showMessage.showSuccess("Event added successfully");
			this.isBusy=false;
		}, err => {
			this.showMessage.showError(err.error);
			this.isBusy = false;
		});
	}

	//Get the date in day-month-year format
	getFormattedDate(date) {
		var formattedDate = new Date(date);
		var day = formattedDate.getDate();
		var month = formattedDate.getMonth() + 1;
		var year = formattedDate.getFullYear();
		return day + "-" + month + "-" + year;
	}

	//Get the time in hours:minutes format
	getFormattedTime(time) {
		var hours = time.getHours();
		var mins = time.getMinutes();
		return hours + ":" + mins;  
	}
}
