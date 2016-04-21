angular.module ('amblr.services', [])

.factory('POIs', function($http, $rootScope, ENV) {
  var POIs = {};

  POIs.getPOIs = function() {
    return $http.get('http://159.203.222.162:3000' + '/api/pois/')
    .then(function(pois) {
      console.log('returning pois are: ', pois);
      return pois;
    })
    .catch(function(err) {
      console.log('error in getting pois in services.js: ', err);
    });
  };

  POIs.savePOI = function(POI) {
    console.log('in save poi', POI);
    return $http({
      method: 'POST',
      url: 'http://159.203.222.162:3000' + '/api/pois/',
      data: JSON.stringify(POI)
    }).then(function(res) {
      $rootScope.$broadcast('reloadPOIs');
      return res;
    })
    .catch(function(err) {
      console.log('error in saving poi to databse', err);
    });
  };
  return POIs;
})

.factory('Location', function($cordovaGeolocation, $ionicLoading) {

  var location = {};

  location.getCurrentPos = function() {
    var position = {};
    $ionicLoading.show({
      template: 'Getting current location...',
      noBackdrop: true
    });

    var options = {timeout: 10000, enableHighAccuracy: true};
    return $cordovaGeolocation.getCurrentPosition(options).then(function (pos) {
      console.log('Got pos', pos);
      position.lat = pos.coords.latitude;
      position.long = pos.coords.longitude;

      $ionicLoading.hide();
      return position;
    }, function (error) {
      alert('Unable to get location: ' + error.message);
      $ionicLoading.hide(); 
    });
  };

  return location;

})
.factory('Videos', function($http, $cordovaCapture, Location) {
  var options = {limit: 3, duration: 15};
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

  videoManager.getVideos = function() {

    return Location.getCurrentPos().then(function(pos) {
      return $http.get('http://159.203.222.162:3000/api/videos', {'headers': {
        'Content-Type': 'application/json',
        'lat': pos.lat, // TODO: actual lat
        'long': pos.long // TODO: actual long
      }})
      .then(function(response) {
        console.log('Successfully got all videos! Returning...');
        return response.data;
      })
      .catch(function(err) {
        console.log('error in getting videos in services.js: ', err);
      });
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
});

