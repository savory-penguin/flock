angular.module('amblr.leftnav', ['ionic', 'ionic-datepicker'])
.controller('LeftMenuNav', function($scope, $ionicPopover, $ionicSideMenuDelegate, ionicDatePicker, Videos, sharedProperties, $rootScope) {
  // show signin menu
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  // default date to today in services.js
  var today = sharedProperties.getDate();
  today = (today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();
  $scope.pickedDate = today;
  /* pull up datepicker calendar
  see the github page for the date picker used here
  https://github.com/rajeshwarpatlolla/ionic-datepicker*/
  var ipObj1 = {

    callback: function (val) {  //Mandatory
      var date = new Date(val);
      sharedProperties.setDate(date);
      date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      $scope.pickedDate = date;
      $rootScope.$broadcast('newDatePicked');
    },

    from: new Date(2012, 1, 1), //Optional
    to: new Date(),             //Optional
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: false,       //Optional
    showTodayButton: true,      //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

});