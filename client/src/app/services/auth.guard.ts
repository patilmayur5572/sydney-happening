import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  	providedIn: 'root'
})
/**
 * This class is used to prevent unauthorised access to other components.
 * Unless the user has logged in he should not be able to access components like dashboard, events create
 */
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthenticationService, private router: Router) {}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if(this.auth.isLoggedIn()) {
			return true; //this would activate the routes for access
		}
		else {
			//redirect to login screen as route not authorized.
			this.router.navigate(['']);
		}
	}
}
