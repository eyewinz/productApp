# productApp

Database setup
--------------

Download and install mongoDb from below link if not available in your machine

https://www.mongodb.com/download-center/community

This should by default start the mongoDb as a service in your machine and make it already running in port 27017


Server Startup
--------------

In the console/command prompt
'cd pdt-server'

execute following commands
npm install
npm install -g nodemon
nodemon server

This should start the server in port 4000 and should say it connected to mongoDb successfully


Client Startup
--------------

In the console/command prompt
'cd pdt-app'

execute following commands
npm install
npm start

This should start the app server in port 3000 and chrome should by now open in http://localhost:3000

Explore the application :-)
