angular.module('amblr.services', [])

.factory('POIs', function($http, $rootScope, $cordovaFileTransfer, ENV) {
  var POIs = {};

  POIs.getPOIs = function() {
    return $http.get('http://54.82.255.110:8080' + '/api/pois/')
      .then(function(pois) {
        console.log('returning pois are: ', pois);
        return pois;
      })
      .catch(function(err) {
        console.log('error in getting pois in services.js: ', err);
      });
  };

  // repurposing this service to save videos
  // uses cordova file transfer to send file
  // and other important paramaeters to server
  POIs.savePOI = function(POI, filePath) {
    var server = 'http://54.82.255.110:8080/api/videos';

    // var params = {
    //   'lat': pos.lat,
    //   'long': pos.long,
    //   'type': 'good',
    //   'description': 'blah blah a video',
    //   'title': 'a random video title'
    // };

    var options = {
      fileKey: 'file',
      fileName: 'aFile.mp4', // set ext based on filePath
      mimeType: 'video/mp4', // set mimetype based on filePath
      params: POI,
      trustAllHosts: true
    };

    return $cordovaFileTransfer.upload(server, filePath, options)
      .then(function(result) {
        $rootScope.$broadcast('reloadPOIs'); // tells the map controller to show new video after upload
        console.log('success, here is your result: ');
        console.log(result);
      }, function(err) {
        console.error('you have an error uploading: ');
        console.error(err);
      }, function(progress) {
        console.log('' + (Math.floor((progress.loaded / progress.total) * 100)) + '%' + ' ' + 'uploaded');
      });




    // console.log('in save poi', POI);
    // return $http({
    //   method: 'POST',
    //   url: 'http://159.203.222.162:3000' + '/api/pois/',
    //   data: JSON.stringify(POI)
    // }).then(function(res) {
    //   $rootScope.$broadcast('reloadPOIs');
    //   return res;
    // })
    // .catch(function(err) {
    //   console.log('error in saving poi to databse', err);
    // });
  };
  return POIs;
})

.factory('Location', function($cordovaGeolocation, $ionicLoading) {

    var location = {};

    location.getCurrentPos = function() {
      var position = {};
      // Prevents template from displaying while polling for new videos
      // $ionicLoading.show({
      //   // template: 'Getting current location...',
      //   noBackdrop: true
      // });

      var options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 30000 };
      return $cordovaGeolocation.getCurrentPosition(options).then(function(pos) {
        console.log('Got pos', pos);
        position.lat = pos.coords.latitude;
        position.long = pos.coords.longitude;

        $ionicLoading.hide();
        return position;
      }, function(error) {
        alert('Unable to get location: ' + error.message);
        $ionicLoading.hide();
      });
    };

    return location;

  })
  .factory('Videos', function($http, $cordovaCapture, Location) {
    var options = { limit: 1, duration: 15 };
    var videoManager = {};


    videoManager.capture = function() {
      return $cordovaCapture.captureVideo(options).then(function(videoData) {
        console.log('here is your video data: ', videoData);
        return videoData;
      }, function(err) {
        // an error occurred;
        console.error('error capturing video:', err);
      });
    };

    videoManager.getVideos = function(pickedDate) {

      return Location.getCurrentPos().then(function(pos) {
        return $http.get('http://54.82.255.110:8080/api/videos', {
            'headers': {
              'Content-Type': 'application/json',
              'lat': pos.lat,
              'long': pos.long,
              'picked': pickedDate
            }
          })
          .then(function(response) {
            console.log('Successfully got all videos! Returning... total video numbers:');
            console.log(response.data.length);
            return response.data;
          })
          .catch(function(err) {
            console.log('error in getting videos in services.js: ');
            console.log(err);
          });
      });
    };

    videoManager.updateLikes = function(fileName, likes) {
      console.log(fileName);
      $http.post('http://54.82.255.110:8080/api/likes', {
        filename: fileName,
        likes: likes
      })
        .then(function(response) {
          console.log('Successfully updated likes.');
        })
        .catch(function(error) {
          console.log('Error updating likes', error);
        });
    };

    return videoManager;
  })
  .factory('CenterMap', function($rootScope) {

    var CenterMap = {};

    CenterMap.recenter = function() {
      $rootScope.$broadcast('centerMap');
      return true;
    };

    return CenterMap;
  })
  .service('sharedProperties', function() {
    var date = new Date();
    return {
      getDate: function() {
        return date;
      },
      setDate: function(pickedDate) {
        date = pickedDate;
      }
    };
  });
