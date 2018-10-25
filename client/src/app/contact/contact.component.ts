import { Component, OnInit } from '@angular/core';
import { EmailService } from '../services/email.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from '../services/toastr.service'; //used to show error or success message. 

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})

// This component class is used for contact us page.
export class ContactComponent implements OnInit {

	sendMessage: FormGroup; //contains the details to be sent for email
	isBusy: boolean=false; //prevent multiple submits of form, once user sends request becomes true until server response.

	constructor(private emailService: EmailService,  private showMessage: ToastrService) { 
		//This formgroup is created to validate the form using Validators.
		this.sendMessage = new FormGroup({
			name: new FormControl(null, Validators.required),
			email: new FormControl(null, Validators.email),
			phone: new FormControl(null,Validators.required),
			message: new FormControl(null, Validators.required)
		});
	}

	ngOnInit() {
	}
	
	//this is used to check if the form is valid by passing each field's name from html
	isValid(controlName) {
		return this.sendMessage.get(controlName).invalid && this.sendMessage.get(controlName).touched;
	}

	//This method is used to call service for sending the email
	sendEmail() {
		this.isBusy = true;
		if(this.sendMessage.valid) {
			this.emailService.sendEmail(this.sendMessage.value).subscribe(response => {
				this.showMessage.showSuccess("Your message has been sent to the admins.");
				this.isBusy=false;
			}, err => {
				this.showMessage.showError(err.error); //display error message from server
				this.isBusy=false; 
			});
		}
	}
}
