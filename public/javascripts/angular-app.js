var liftsApp = angular.module('liftsApp', ['ng-sortable']).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
    });


liftsApp.controller('LiftListCtrl', function($scope, $http){

  $scope.fetch = function(){
    $http.get('/api').success(function(data) {
      console.log('We got it');
      $scope.lifts = data;
      console.log($scope.lifts);
    });
  };

  $scope.addTo = function(name, description,event){
    $http({
      method: 'POST',
      url: '/workoutapi',
      data: {
        Name: name,
        Description: description
      }
    })
    .then(function successCallback(response) {
      event.preventDefault();
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.fetch();


})


var workoutApp = angular.module('workoutApp', ['ng-sortable']).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
    });


workoutApp.controller('workoutCtrl', function($scope, $http){

  $scope.removeLift = function(lift){
    console.log(lift);
      $http.delete('/workoutapi/' + lift["_id"]).success(function(){
        $scope.fetch();
      });
  }

  $scope.addSets = function(sets,lift, event){
    $http.patch('/workoutapi/'+ lift["_id"],{sets: sets})
    .success(function(data, status){
      event.preventDefault();
      $scope.fetch(); //grab the list back down!!
    });
  }

    $scope.addReps = function(reps,lift,event){
      $http.patch('/workoutapi/'+ lift["_id"],{reps: reps})
        .success(function(data, status){
        event.preventDefault();
        $scope.fetch(); //grab the list back down!!
       });
    }

    $scope.addWeight = function(weight,lift,event){
      $http.patch('/workoutapi/'+ lift["_id"],{weight: weight})
        .success(function(data, status){
        event.preventDefault();
        $scope.fetch(); //grab the list back down!!
      });
    }


  $scope.fetch = function(){
    $http.get('/workoutapi').success(function(data) {
      console.log('We got it');
      $scope.workout = data;
      console.log($scope.workout);

    });
  };



  $scope.fetch();




});
