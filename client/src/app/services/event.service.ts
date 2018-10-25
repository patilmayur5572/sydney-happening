import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  	providedIn: 'root'
})

// This class is used to provide services related to Events like create, update, delete, register etc.
export class EventService {

	apiUrl : string;

  	constructor(private http: HttpClient) {
    	this.apiUrl = `${environment.domainURL}` + '/events';
  	}
	
	//call server API to get all the events available
  	getEvents(): Observable<any> {
    	const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
    	return this.http.get(this.apiUrl + '/getAllEvents', {headers});
  	} 
	
	//call server API to get an event by event ID
	getEvent(eventID): Observable<any> {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.get(this.apiUrl+ '/getEvent/'+ eventID, {headers});
	}

	//call server API to create a new event
	addEvent(data): Observable<any> {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.post(this.apiUrl + '/addEvent', data, {headers});
	}

	//call server API to update an existing event, only accessible with admin IDs
	updateEvent(eventID, event):Observable<any>
	{
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.patch(this.apiUrl + '/updateEvent' ,event, {headers});
	}

	//call server API to delete an event, only accessible with admin IDs
	deleteEvent(eventID: string): Observable<any> {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.delete(this.apiUrl + '/deleteEvent/'+ eventID,  {headers});
	}

	//call server API to register user to an event
	registerToAttend(userEventRegister) {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.post(this.apiUrl + '/registerToAttend', userEventRegister, {headers});
	}

	//call server API to get events registered by the user
	getUserEvents(userData) {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.post(this.apiUrl + '/getUserEvents', userData, {headers});
	}
}
