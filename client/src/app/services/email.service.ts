import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  	providedIn: 'root'
})

//This class is used to provide the email services. 
export class EmailService {

	apiUrl : string; //contains the url of the server.

	constructor(private http: HttpClient) {
		this.apiUrl = `${environment.domainURL}` + '/emails';
	}
	
	//server call with message to send to admins
	sendEmail(message) {
		return this.http.post(this.apiUrl + '/sendEmail', message);
	}
}
