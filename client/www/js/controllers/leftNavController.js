angular.module('amblr.leftnav', ['ionic', 'ionic-datepicker'])
.controller('LeftMenuNav', function($scope, $ionicPopover, $ionicSideMenuDelegate, ionicDatePicker) {
  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  // see the github page for the date picker used here
  // https://github.com/rajeshwarpatlolla/ionic-datepicker
  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
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