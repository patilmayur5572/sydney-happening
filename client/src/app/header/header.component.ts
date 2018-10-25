import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})

//Component class to generate the header, common in all pages.
export class HeaderComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	//This is used to check if user has logged in, else do not display.
	checkIfLoggedIn() {
		if(localStorage.getItem('token')) {
			return true;
		}
		else {
			return false;
		}   
	}
	
	/*
	* This clears the local storage
	* since token saved in local storage is erased, user logs out.
	*/
	logout() {
		localStorage.clear();
	}
}
