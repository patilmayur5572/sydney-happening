import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

//This would be used to store the response from server
interface AuthenticationReponse {
	loginStatus: boolean;
	token: string;
	userID: string,
	firstName: string;
	email: string;
	IsAdmin: boolean;
}

@Injectable({
  	providedIn: 'root'
})
/**
 * This class is used to provide the authentication service.
 * Validate login, token verification for login
 */
export class AuthenticationService {

	apiUrl : string; //contains url to be used for server

	constructor(private http: HttpClient) {
		this.apiUrl = `${environment.domainURL}` + '/users';
	}
	
	//server call to validate login, returns instance of AuthenticationResponse on success
	validateLogin(validateLogin) {
		return this.http.post<AuthenticationReponse>(this.apiUrl +'/login', validateLogin);    
	}

	/**
	 * This method would be called to check if user is logged in 
	 * checks if a token is present, if present returns true 
	 */
	isLoggedIn() {
		if(localStorage.getItem('token') === null) {
			return false;
		}
		else {
			return true;
		}  
	}

	//server call to verify if the token has expired or not. 
	checkIfLoggedIn() {
		const headers = new HttpHeaders().append("token", localStorage.getItem('token'));
		return this.http.get(this.apiUrl + '/validateToken', {headers});
	}
}
