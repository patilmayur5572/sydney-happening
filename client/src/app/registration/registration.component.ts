import { Component } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterationService } from '../services/registeration.service';
import { ToastrService } from '../services/toastr.service'; //used to show error or success messages.


@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})

// This component is used to generate the registeration page.
export class RegistrationComponent {

	registerationForm: FormGroup; //contains the form data for registering a new user.
	isBusy:boolean = false; //prevent multiple submits of form, once user sends request becomes true until server response.

	constructor(private registerationService: RegisterationService, private showMessage: ToastrService, private router: Router) {
		//set the validation parameters for the form here.
		this.registerationForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, Validators.email),
			password: new FormControl(null, Validators.required),
			confirmPassword: new FormControl(null, this.passwordValidator),
			IsAdmin: new FormControl(false)
		});
	
		//subscribe to value changes of the password field so that confirm password check happens again. 
		this.registerationForm.controls.password.valueChanges.subscribe(
		x => this.registerationForm.controls.confirmPassword.updateValueAndValidity()
		);
	}

	//this is used to check if the form is valid by passing each field's name from html
	isValid(controlName) {
		return this.registerationForm.get(controlName).invalid && this.registerationForm.get(controlName).touched;
	}

	//validate the form and register user
	validateAndRegister() {
		this.isBusy =true;
		if(this.registerationForm.valid) {
			this.registerationService.registerUser(this.registerationForm.value).subscribe(data => {
				this.showMessage.showSuccess("User registered, please login");
				this.router.navigate(['']); //navigate to login
				this.isBusy=false;
			}, err => {
				this.showMessage.showError(err._body);
				this.isBusy=false;
			});
		}
	}

	//This method is used to validate password and confirm password match
	passwordValidator(control: AbstractControl) {
		if (control && (control.value !== null || control.value !== undefined)) {
			const confirmPassword = control.value;
			const passControl = control.root.get('password');
				if (passControl) {
					const passValue = passControl.value;
					if (passValue !== confirmPassword || passValue === '') {
						return {
							isError: true
						};
					}
				}
			}
		return null;
	} 
}
