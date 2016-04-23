angular.module('amblr.leftnav', ['ionic', 'ionic-datepicker'])
.controller('LeftMenuNav', function($scope, $ionicPopover, $ionicSideMenuDelegate, ionicDatePicker) {
  // default date to today
  var today = new Date();
  today = (today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();
  $scope.pickDate = today;

  $scope.showMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  // see the github page for the date picker used here
  // https://github.com/rajeshwarpatlolla/ionic-datepicker
  var ipObj1 = {
    callback: function (val) {  //Mandatory
      var date = new Date(val);
      date = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
      console.log(date);
      $scope.pickDate = date;
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