![](https://dl.dropboxusercontent.com/s/2xhujbw3906phvr/banner-128.png?dl=0) 
---

# flock ![Stablity Status](https://img.shields.io/pypi/status/Django.svg?maxAge=25920000)

Flock is a way to see the city through other people's eyes. Store and view videos at your location, across time. 

Supported operating systems are >= iOS 7.0 and >= Android 6.0

- [Team Members](#team-members-v-15)
- [Technology Stack](#technology-stack-apis-and-third-party-tools)
- [Client Framework](#client-ionic)
- [Server Setup](#server-node--express)
- [Database](#database-mongodb--mongoose)
- [Legacy Project Ideas](#legacy-project-ideas)
- [Tips & Tricks](#tips--tricks)

## Team Members (v. 1.5)
[![Nathaniel Edwards](https://dl.dropboxusercontent.com/s/9dzxid7ihg37c97/nthaniel.png?dl=0)](https://github.com/nthaniel)

[![Michelle He](https://dl.dropboxusercontent.com/s/zecyw2vna8m56d3/michelleheh.png?dl=0)](https://github.com/michelleheh)

[![Rahim Dharrsi](https://dl.dropboxusercontent.com/s/3typmiqn3wv8f8k/rahimftd.png?dl=0)](https://github.com/rahimftd)

[![Kevin Nguyen](https://dl.dropboxusercontent.com/s/wyebxbavnc7ihk7/kevinwin.png?dl=0)](https://github.com/kevinwin)
  
## Technology Stack, APIs, and Third-party tools

- [Ionic](http://ionicframework.com)
- Node.js & [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.org/) and [Mongoose](http://mongoosejs.com/)
- [Digital Ocean](https://www.digitalocean.com/)
- [Angular Google Maps](https://angular-ui.github.io/angular-google-maps/)
- [$cordovaCapture](http://ngcordova.com/docs/plugins/capture)
- [$cordovaFileTransfer](http://ngcordova.com/docs/plugins/fileTransfer)


## Client: Ionic

To get started with Ionic in Flock, follow these steps as needed.

1. Install NPM and Bower
2. Inside the `client` folder, run `npm install` and `bower install`
3. Install cordova and ionic globally. Run `npm install -g cordova ionic`
4. Add all platforms (inside the client folder):

For Android:
```
ionic platform add android
ionic build android
```

For iOS:
```
ionic platform add ios
ionic build ios

```

* iOS users need to run `cordova prepare` when making changes to the client before porting to real devices

5. [Port your application on real devices](http://www.neilberry.com/how-to-run-your-ionic-app-on-real-devices/)

## Server: Node & Express

<!-- All files for the server can be found in the server folder. The server also makes use of the database helper functions in db/db.js.
  - server/sever.js: Configures the server and listens on port 8000.
  - server/config/requestHandler.js: Majority of server processes are handled by this file. It contains handler functions for all requests that come into the server.
  - server/config/routes.js: Defines the routes for the various types of requests.
  - server/config/foursquare.js: Makes requests to the foursquare API. Used in the request handlers.
  - server/config/foursquarekeys.example.js: An example file that you will need to update with your Foursquare API keys to. It goes without saying that you should not push your API keys to github or anywhere else that may compromise their security.

The uploads folder is used to store users' profile images. -->


## Database: MongoDB & Mongoose

<!-- The Mongodb database has 3 tables: users, matchrequests, and successfulmatches (schema can be found in db/config.js). 
  - The users table has 5 columns: username, firstname, email, funfact, profileimage) which are set at the time of user signup.
  - The matchrequests table has 5 columns: username, latitude, longitude, isActive, and timestamp.
      > isActive is a boolean that flags whether the given matchRequest has been fulfilled.
      > Timestamp is set automatically. The server uses the timestamp to determine whether or not a given match is valid. Currently, any matchrequest older than 45s is considered to be invalid.
  - db/config.js contains the database schema and mongoose models for User, MatchRequest, and SuccessfulMatch

Database helper functions can be found in db/db.js. These helper functions are used by the request handlers in server/config/requestHandler.js
  - getUsers will return a list of userts matching the passed-in arguments.
  - checkIfUserExists will return a boolean value based on whether a given user exists in the database.
  - addUser will add a new user to the database.
  - getAllUsers will return a full list of users in the database. This function is not currently used, but may come in handy in the future.
  - removeUser will remove the specified user from the database. This function is not currently used, but may come in handy in the future.
  - getMatchRequests will return a list of matchRequests that meet the time cutoff (requestTimeCutoff)
  - getSuccessfulMatchForUser will return the successful match (if any) for a given user. Any match that is older than 1min will not be returned. This time cutoff has been included to prevent the system from accidentally returning old matches.
  - updateUser will update a user's database entry with the new values provided -->




