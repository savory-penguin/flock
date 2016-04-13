angular.module('amblr.signup', [])
.controller('signupCtrl', function($scope, $ionicModal, $http) {
  // Form data for the signup modal
  $scope.signupData = {};

  // Create the signup modal that we will use later
  $ionicModal.fromTemplateUrl('../../templates/signup.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the signup modal to close it
  $scope.closeSignup = function() {
    $scope.modal.hide();
  };

  // Open the signup modal
  $scope.signup = function() {
    $scope.modal.show();
  };

  // Perform the signup action when the user submits the signup form
  $scope.doSignup = function() {
    console.log('Doing signup', $scope.signupData);

    $http({
      method: 'POST',
      url: '/api/users/signup',
      data: $scope.signupData
    })
    .then(function(res) {
      $scope.closeSignup();
    }, function(err) {
      throw new Error ('Error signing up user: ' + $scope.signupData.username + ', error: ' + err);
    });
    
  };
});