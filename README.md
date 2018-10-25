# SydneyHappening

Sydney Happening is web-application which allows registered users to create and register to events posted. <br>
Some of the functionalities include: <br>
 * Register User<br>
 * Login<br>
 * Register to events<br>
 * Create new events<br>
 * Send email to site admins.<br>
 * Update events (Admin functionality)<br>
 * Delete events (Admin functionality)<br>
 * JWT token validation for login and server calls<br>
 * Authentication for accessing site urls<br>
 * Responsive UI.<br>

## Table of contents
<!--ts-->
   * [Getting Started](#getting-started)
   * [Code Scaffolding](#code-scaffolding)
   * [Build](#build)
   * [Deployment](#deployment)
   * [Database](#database)
   * [Sending Email functionality](#sending-email-functionality)
   * [Screenshot](#screenshot)
<!--te-->

## Getting Started
Please clone SydneyHappening project into your local system to work with it. <br>

### Checking out the source-code from Github:
You need Git for cloning the project into your system. Please follow [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for Git installation. For cloning the the project, open `Git Bash` and give the following command: <br/>
`git clone https://github.com/Sunit22/SydneyHappening.git` <br>

### NPM, Angular CLI and Node.js installation:
The client-side is developed using Angular CLI and the server-side code is developed using Node.js. Please follow these instruction to download and install 
[Node Package Manager(npm) and Node.js](https://www.npmjs.com/get-npm). After Node Package Manager (npm) has been installed, download and install [Angular CLI from here](https://cli.angular.io/) <br>

### Starting the SydneyHappening project
After completing the installations, navigate to `SydneyHappening/server/` directory and give command <br>
`npm intall`<br>
This would install all the package dependencies for the server from `package.json file` in the `node_modules` directory. <br>  

Once the installation has finished, navigate to `SydneyHappening/server/server.js` and verify the server port address. By default the port number would be 3000, however it can be changed as per requirement. Start the server using command: <br>
`node server.js`<br>
If the port has not been changed, by default, the server should start at `http://localhost:3000` <br>

Navigate to `SydneyHappening/client/` and give command `npm install` to install all the dependencies in `package.json`<br>
Once the installation has been completed run command: <br>
`ng serve` <br> Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding
### For Generating new component in client side, use command: 
`ng generate component component-name`. 
### For Generating new service in client side, use command
`ng generate service service-name`.
### Use following to generate other features like modules etc
`ng generate directive|pipe|class|guard|interface|enum|module`.

## Build
Navigate to `SydneyHappening/client/` and run command `ng build` to build the project. The build artifacts will be stored in the `dist/` directory which has been modified to be created in `SydneyHappening/server/` folder for easy deployment. <br>
For changing where the `dist/` folder is created please modify `SydneyHappening/client/angular.json`. <br>
**Note:**
If you change the location to save `dist/` directory, please update `SydneyHappening/server/app.js` with correct path. 

## Deployment
For deployment, Navigate to `SydneyHappening/client/` and run command: `ng build` to build the angular side of the project. This would create a directory named `dist/` in `SydneyHappening/server/` folder. You can deploy the project as a Node.js project from this directory. <br>
For deploying into Heroku server, [follow these steps](https://devcenter.heroku.com/articles/deploying-nodejs).<br>
**Note:**
The domainURL of the server needs to be updated on  `SydneyHappening/client/src/environments/environment.ts` <br>
For example, if the URL is https://www.sydneyhappening.herokuapp.com then it needs to be updated as the domainURL.

## Database
For this project we have used [MLAB](https://mlab.com/), for using database services with mongodb. However, you can use local mongodb and connect this application to local database. <br>
For installing mongodb please [follow these steps](https://docs.mongodb.com/manual/installation/). You can update the configuration to use your local database in `SydneyHappening/server/config/DatabaseConnectionString.js`. 

## Sending Email functionality
We have removed the keys to our email for security purposes, please follow [Nodemailer guide](https://nodemailer.com/about/) to register an with an smtp server to send emails.

## Screenshot
![Screen1](https://i.imgur.com/G9jqJ6R.png)
![Screen2](https://i.imgur.com/cLe8Kzx.png)
![Screen3](https://i.imgur.com/wo5TexB.png)
![Screen4](https://i.imgur.com/9Lzxqpa.png)

