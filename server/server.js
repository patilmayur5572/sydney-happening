const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000; //specify the port to start the server

const server = http.createServer(app);
//inform in console the server has started on port : number
server.listen(port,  () => console.log(`Server started on port : ${port}`)); 