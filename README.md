![](https://dl.dropboxusercontent.com/s/2xhujbw3906phvr/banner-128.png?dl=0) 
---

# flock ![Stablity Status](https://img.shields.io/pypi/status/Django.svg?maxAge=25920000)

Flock is a way to see the city through other people's eyes. Store and view videos at your location, across time. 

Supported operating systems are >= iOS 7.0 and >= Android 6.0
Flock is a fork of [amblr](http://github.com/mediocreokra/amblr)

- [Team Members](#team-members-v-15)
- [Technology Stack](#technology-stack-apis-and-third-party-tools)
- [Client Framework](#client-ionic)
- [Server Setup](#server-node--express)
- [Challenges](#challenges)
- [Changes from v. 1.0](#changes-from-v-10)
- [Future Feature Extensions](#future-feature-extensions)

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

To run server code locally:

```
# the server folder

npm install
grunt server-dev
```



## Challenges

- Transcoding video files. Ubuntu 14.04 doesn't come preloaded with ffmpeg
- Deployment and porting to phone
- Ionic. Modals and icons didn't work as expected for mobile without workarounds
- Navigating ionic, cordov

## Changes from v. 1.0

- POI markers now use video camera icons exclusively
- File upload handling on the server-side
- Geofencing. Videos only appear within a certain radius
- Calendar / Time Filter
- Likes
- New server endpoints for likes and videos

## Future Feature Extensions
- Landmarks. Add the ability to drop a pin and request videos in that location
- Clustering videos that fall within certain boundaries 
- Form Validation


