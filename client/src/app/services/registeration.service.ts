import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from "../../environments/environment";


@Injectable({
  	providedIn: 'root'
})

//This class provides services related to user registeration.
export class RegisterationService {

	apiUrl : string; //url of the server to be used 

	constructor(private http: Http) { 
		this.apiUrl = `${environment.domainURL}` + '/users/register';
	}

	//server call to register the user
	registerUser(registerationData) {
		console.log(this.apiUrl);
		return this.http.post(this.apiUrl, registerationData);
	}
}
