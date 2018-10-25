import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from '../services/toastr.service'; //used to show error or success messages

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

// Component class to generate the login page.
export class LoginComponent implements OnInit {
     
	loginForm: FormGroup; //used to caputure username and password
	isBusy: boolean = false; //prevent multiple submits of form, once user sends request becomes true until server response.

	constructor(private authenticationService: AuthenticationService, 
		private showMessage: ToastrService, private router: Router) { 
			this.loginForm = new FormGroup({
				email: new FormControl(null, Validators.email),
				password: new FormControl(null, Validators.required)      
			});
	}

	ngOnInit() {
		this.checkIfLoggedIn();
	}

	checkIfLoggedIn() {
		if(localStorage.getItem('token') != null) {
			this.authenticationService.checkIfLoggedIn().subscribe (response => {
				this.router.navigate(['/dashboard']);
			}, err => {  
				if(err.status == 400) {
					//The token though present in local storage has expired or not present. 
					//clear localStorage here. 
					localStorage.clear();
				}
			});
		}
	}

	//this is used to check if the form is valid by passing each field's name from html
	isValid(controlName) {
		return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
	}

	//this method would call server to validate the credentials
	validateLogin() {
		this.isBusy = true;
		if(this.loginForm.valid) {
			this.authenticationService.validateLogin(this.loginForm.value).subscribe(response => {
				//if login is successful, store data in local storage to be used for token and access.
				localStorage.setItem('token', response.token);
				localStorage.setItem('userID', response.userID);
				localStorage.setItem('firstName', response.firstName);
				localStorage.setItem('email', response.email);
				localStorage.setItem('IsAdmin', response.IsAdmin.toString());
				this.showMessage.showSuccess("You have successfully logged in");
				this.isBusy = false;
				this.router.navigate(['/dashboard']);  
			}, err => {
				this.isBusy = false;
				this.showMessage.showError(err.error);
			}); 
		}
	}
}
