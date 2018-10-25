import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { Event } from '../models/Event';
import { UserEventRegister } from '../models/UserEventRegister';
import { ToastrService } from '../services/toastr.service'; //show error or success message

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css']
})

// Component class to show the event details page.
export class EventsComponent implements OnInit {
  
	eventId: string; //store event id 
	event: Event = {
		_id: '',
		name: '',
		venue: '',
		date: '',
		time: '',
		seats: 0,
		createdBy: ''
	}; //store the details of the event. 

	userEvent: UserEventRegister = {
		userID: '',
		eventID: ''
	}; //capture user and event details to add user to event

	constructor(private route: ActivatedRoute,private eventService: EventService, private router: Router,
		private showMessage: ToastrService) {}

	ngOnInit() {
		//get the event id
		this.route.queryParams.subscribe(params => {
			this.eventId = params['eventID']
		});
		//use event id to get event.  
		this.eventService.getEvent(this.eventId).subscribe(event => {
			this.event = event;
		}, err => {
			this.showMessage.showError(err.error);
		});    
	}

	//register the user to event.
	registerToAttend() {
		this.userEvent.userID = localStorage.getItem('userID');
		this.userEvent.eventID = this.event._id;
		this.eventService.registerToAttend(this.userEvent).subscribe(response => {
			this.showMessage.showSuccess("You have successfully registered for the event!");
			this.router.navigate(['/dashboard']);
		}, err=>{
			console.log(err)
			this.showMessage.showError(err.error);
		});
	}  
}
