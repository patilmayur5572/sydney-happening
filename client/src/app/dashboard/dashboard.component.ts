import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, NavigationExtras } from '@angular/router';
import { UserData } from '../models/userData';
import { ToastrService } from '../services/toastr.service'; //show error or success message
import { Event } from '../models/Event';
import { UserEventRegister } from '../models/UserEventRegister';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

// Component class for the dashboard
export class DashboardComponent implements OnInit {
  
	eventList: Event []; 				//contains array of events to be added in dashboard
	IsAdmin: boolean; 					//store if admin or not 
	registeredList: any; 				//contains list of events registered by the user
	showEvents: boolean= false; 		//check if to show user registered events
	user: String; 						//used to store the username
	userData: UserData = {
		userID: '',
		firstName: ''
	}; 									//used to fetch the events registered to the user. 
	
	constructor(private eventService: EventService, private router: Router, 
		private showMessage: ToastrService) {
			this.IsAdmin = localStorage.getItem('IsAdmin').toLowerCase() =='true' ? true : false;    
	}

	ngOnInit() {
		this.user = localStorage.getItem('firstName');
		this.getAllEvents();
		this.getUserEvents();
	}

	//Get all the events from the server API
	getAllEvents() {  
		this.eventService.getEvents().subscribe(events => { 
			this.eventList = events;
		}, err => {
			this.showMessage.showError(err.error);
		});
	}

	//get events registered to by the user
	getUserEvents() {
		this.userData.firstName = localStorage.getItem('firstName');
		this.userData.userID = localStorage.getItem('userID');
		this.eventService.getUserEvents(this.userData).subscribe(events => {
		if(events) {			
			for (var event in events) {				
				this.registeredList = events[event];					
			}
			this.showEvents=true;
		}
		else {
			this.showEvents=false;
		}
		}, err => {
			this.showMessage.showError(err.error);
		});
	}

	//Navigate to a Events page to display event details.
	eventDetails(eventID: string) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"eventID": eventID
			}
		};
		this.router.navigate(['/events'], navigationExtras);
	}

	//Update an Event, can be only used from admin Ids
	updateEvent(eventID: string) {    
		let navigationExtras: NavigationExtras = {
			queryParams: {
				"eventID": eventID
			}
		};
		this.router.navigate(['/eventEdit'], navigationExtras);
	}

	//fetch event id for deletion, this is called from the dashboard html 
	selectForDeletion(eventID: string) {    
		localStorage.setItem("eventID", eventID);    
	}
	
	//Delete an event, this can be only called from an admin ids
	deleteEvent() {    
		const _id = localStorage.getItem("eventID");
		this.eventService.deleteEvent(_id).subscribe(data => {
			localStorage.removeItem("eventID");
			this.showMessage.showSuccess("Event deleted successfully");
			this.getAllEvents();
		}, err => {
			this.showMessage.showError(err.error); 
		});
	}
}
