import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, } from '@angular/core';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastaModule } from 'ngx-toasta';
import { AuthGuard } from './services/auth.guard';

import { EventService } from './services/event.service';
import { AuthenticationService } from './services//authentication.service';
import { RegisterationService } from './services/registeration.service';
import { EmailService } from './services/email.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventsComponent } from './events/events.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		RegistrationComponent,
		EventsComponent,
		HeaderComponent,
		FooterComponent,
		ContactComponent,
		EventCreateComponent,
		EventEditComponent,
		AboutUsComponent,
		NotFoundComponent
	],

	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		HttpClientModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		ToastaModule,
		RouterModule.forRoot([
		{ path: '', 
			component: LoginComponent 
		},
		{ path: 'dashboard', 
			component: DashboardComponent,
			canActivate: [AuthGuard] //checks AuthenticationService to confirm if user can go to page or not
		},
		{ path: 'events', 
			component: EventsComponent, 
			data: {title: 'Event-Details'},
			canActivate: [AuthGuard] //checks AuthenticationService to confirm if user can go to page or not
		},
		{ path: 'registration', 
			component: RegistrationComponent 
		},
		{ path: 'contact', component: ContactComponent },
		{ path: 'eventCreate',
			component: EventCreateComponent,
			canActivate: [AuthGuard] //checks AuthenticationService to confirm if user can go to page or not
		},
		{ path: 'eventEdit',
			component: EventEditComponent,
			canActivate: [AuthGuard] //checks AuthenticationService to confirm if user can go to page or not
		},
		{ path: 'about', 
			component: AboutUsComponent 
		},
		{ path: 'page-not-found', 
			component: NotFoundComponent 
		},
		{ path: '**', 
			redirectTo: 'page-not-found' 
		},
		])
	],
	providers: [EventService, AuthenticationService, RegisterationService, EmailService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
