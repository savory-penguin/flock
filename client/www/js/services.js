angular.module ('amblr.services', [])

.factory('POIs', function($http, $rootScope, ENV) {
  var POIs = {};

  POIs.getPOIs = function() {
    return $http.get(ENV.apiEndpoint + '/api/pois/')
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
      url: ENV.apiEndpoint + '/api/pois/',
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
.factory('Videos', function($cordovaCapture) {
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

