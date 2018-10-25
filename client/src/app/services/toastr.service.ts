import { Injectable } from '@angular/core';
import { ToastaService, ToastOptions } from 'ngx-toasta';

@Injectable({
  	providedIn: 'root'
})

//This class is used to provide servies to show pop up messages to user.
export class ToastrService {

	constructor(public toastr: ToastaService) { }

	//used to show success messages to the user
	showSuccess(message) {
		let toastOptions: ToastOptions = {
			title : 'Success!',
			msg: message,
			showClose: true,
			timeout: 5000,
			theme:'bootstrap'
		}
		return this.toastr.success(toastOptions);
	}
	
	//used to show error messages to the user
	showError(message) {
		let toastOptions: ToastOptions = {
			title : 'Oops!',
			msg: message,
			showClose: true,
			timeout: 5000,
			theme:'bootstrap'
		}
		return this.toastr.error(toastOptions);
	}
	
	//used to show warning messages to the user
	showWarning(message) {
		let toastOptions: ToastOptions = {
			title : 'Alert!',
			msg: message,
			showClose: true,
			timeout: 5000,
			theme:'bootstrap'
		}
		return this.toastr.warning(toastOptions);
	}
	
	//used to show information messages to the user
	showInfo(message) {
		let toastOptions: ToastOptions = {
			title : 'Info!',
			msg: message,
			showClose: true,
			timeout: 5000,
			theme:'bootstrap'
		}
		return this.toastr.info(message);
	}
}

