angular.module('amblr.addCapture', ['ionic', 'ngCordova'])
.controller('addCaptureController', function($scope, $ionicPlatform, $timeout, $ionicModal, $cordovaCapture, POIs, $location, $ionicPopup, Location) {

  // $ionicModal.fromTemplateUrl('../../templates/addCapture.html', {
  $ionicModal.fromTemplateUrl('addCaptureModal.html', {
    scope: $scope,
    animation: 'slide-in-up',
  })
  .then(function(modal) {
    $scope.modal = modal;
    console.log('this is the capture modal', modal); 
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  //current POI is an object with properties: lat, long, type, description, title
  //set default of type to good
  $scope.selected = 'good';
  $scope.currentPOI = { type: 'good'};

  //save POI upon user save
  $scope.savePOI = function() {
    //post currentPOI to the database
    POIs.savePOI($scope.currentPOI)
    .then(function(poi) {
      console.log('poi saved', poi);
      //clear out currentPOI
      $scope.poiSaved = poi;
      $scope.currentPOI = {type: 'good'};
      console.log($scope.currentPOI, 'after');
      $scope.closeForm();
      // redirect to home page (may not need this)
      $scope.onSuccess();
      $location.path('/menu/home');
    })
    .catch(function(err) {
      console.log('error in saving poi to database', err);
      $scope.onError();
    });
  };

  $scope.onError = function() {
    $ionicPopup.alert({
      title: 'Oops there as was Problem :(',
      template: 'Would you like to try again?',
      buttons: [
      { text: 'Cancel'},
      { text: 'Try Again',
        type: 'button-dark',
        onTap: function(e) {
          $scope.openForm(); 
        }
      }]
    });
  };

  $scope.onSuccess = function() {
    $ionicPopup.alert({
      title: 'POI Saved!',
      template: 'Yay! You\'ve successfully added a POI to amblr!'
    });
  };

  $scope.cancelPOI = function() {
    $scope.currentPOI = { type: 'good'};
    $scope.closeForm();
    $location.path('/menu/home');
  };
  
  $scope.openForm = function() {
    //get current position from Location factory
    Location.getCurrentPos()
    .then(function(pos) {
      console.log('pos from factory call', pos);
      $scope.currentPOI.lat = pos.lat;
      $scope.currentPOI.long = pos.long;
      //once position is found, open up modal form
      console.log($scope.currentPOI);
      $scope.modal.show();
    })
    .catch(function(err) {
      console.log('error in getting current pos', err);
      $ionicPopup.alert({
        title: 'Error in getting current location',
        template: 'Please Try again later'
      });
      $location.path('/menu/home');
    });
    //returns a promise which is resolved when modal is finished animating in.
  };

  //close POI form
  $scope.closeForm = function() {
    $scope.modal.hide();
  };
  //toggles View of modal form depending on state
  $scope.toggleView = function() {
    if ($scope.modal.isShown()) {
      $scope.closeForm();
    } else {
      $scope.openForm();
    }
  };

  $scope.test = function() {
    var options = { limit: 3, duration: 3 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occurred. Show a message to the user
    });
  };

  $scope.captureVideo = function() {
    var options = {limit: 1, duration: 3};
    $cordovaCapture.captureVideo(options).then(function(videoData) {
      $scope.videoPath = videoData[0].fullPath;
      $scope.modal.show();
    }, function(err) {
      // an error occurred;
      console.error('error capturing video:', err);
    });
  };

  //clean up modal when done
  $scope.$on('$destroy', function() {
    $scope.modal.hide();
  });

});
