angular.module('amblr.addPOI', ['ngCordova'])
  .controller('addPOIController', function($scope, $http, $ionicPlatform, $timeout, $ionicModal, $cordovaCapture, POIs, $location, $ionicPopup, $cordovaFileTransfer, Location, Videos) {

    // $ionicModal.fromTemplateUrl('../../templates/addPOI.html', {
    $ionicModal.fromTemplateUrl('addCaptureModal.html', {
        scope: $scope,
        animation: 'slide-in-up',
        // backdropClickToClose: true,
        // hardwareBackButtonClose: true
      })
      .then(function(modal) {
        $scope.modal = modal;
      });

    //current POI is an object with properties: lat, long, type, description, title
    //set default of type to good
    $scope.selected = 'good';
    $scope.currentPOI = { type: 'good' };

    //save POI upon user save
    // NOTE: this savePOI is repurposed to 
    // upload videos, will then close modal after save
    $scope.savePOI = function() {
      $scope.closeForm();
      //post currentPOI to the database
      POIs.savePOI($scope.currentPOI, $scope.filePath)
        .then(function(poi) {
          console.log('poi saved', poi);
          //clear out currentPOI
          $scope.poiSaved = poi;
          $scope.currentPOI = { type: 'good' };
          console.log($scope.currentPOI, 'after');
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
          { text: 'Cancel' }, {
            text: 'Try Again',
            type: 'button-dark',
            onTap: function(e) {
              $scope.openForm();
            }
          }
        ]
      });
    };

    $scope.onSuccess = function() {
      $ionicPopup.alert({
        title: 'Video Saved!',
        template: 'Yay! You\'ve successfully added a Video to amblr!'
      });
    };

    $scope.cancelPOI = function() {
      $scope.currentPOI = { type: 'good' };
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

    $scope.captureVideo = function() {
      // var server = 'http://localhost:3000/api/videos'; // development
      // var server = 'http://159.203.222.162:3000/api/videos'; // remote server
      Videos.capture().then(function(data) {
        $scope.filePath = data[0].localURL; // save filePath to scope
        $scope.videoPath = data[0].fullPath;

        // open Form 
        // Transitions to modal
        // Modal handles file upload
        $scope.openForm();
        

        // Location.getCurrentPos().then(function(pos) {
        //   var filePath = data[0].localURL;
        //   var params = {
        //     'lat': pos.lat,
        //     'long': pos.long,
        //     'type': 'good',
        //     'description': 'blah blah a video',
        //     'title': 'a random video title'
        //   };

        //   var options = {
        //     fileKey: 'file',
        //     fileName: 'aFile.mov', // set ext based on filePath
        //     mimeType: 'video/quicktime', // set mimetype based on filePath
        //     params: params,
        //     trustAllHosts: true
        //   };

        //   $cordovaFileTransfer.upload(server, filePath, options)
        //     .then(function(result) {
        //       console.log('success, here is your result: ');
        //       console.log(result);
        //     }, function(err) {
        //       console.error('you have an error uploading: ', err);
        //     }, function(progress) {
        //       console.log('' + (Math.floor((progress.loaded / progress.total) * 100)) + '%' + ' ' + 'uploaded');
        //     });
        // });
      });
    };

    $scope.showVideos = function() {
      Videos.getVideos().then(function(allVids) {
        console.log('here are all your vids: ', allVids);
      });
    }

    //clean up modal when done
    $scope.$on('$destroy', function() {
      $scope.modal.hide();
    });

  });
