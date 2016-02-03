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

  $scope.addTo = function(name, description, event){
    var user = $('#userInput').val();
    console.log('------user------')
    console.log(user);
    $http({
      method: 'POST',
      url: '/workoutapi',
      data: {
        Name: name,
        Description: description,
        User: user
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

  // $scope.changed = function(element) {
  //   var index = angular.element(element).$scope().$index;
  //   console.log('-------shithappenedyo')
  //   console.log(index);
  // }

  $scope.workoutConfig = {
    onEnd: function(evt){
      console.log();
      console.log('old index onend == ' + evt.oldIndex);
      console.log('new index onend== ' + evt.newIndex);
      // for (var model in evt.models){
      //   console.log(evt.models[model].Name);
      // }
      if (evt.newIndex && evt.newIndex != evt.oldIndex) {
      console.log('your index changed!!!');
      $http.patch('/workoutapi/'+ evt.model["_id"],{Position: evt.newIndex})
        .then(function(data, status){
        console.log('updated   ' + evt.model.Name + 's position to ' + evt.newIndex);
        //$scope.fetch();
        });
      } else {
        console.log('yo index did not change.');
      }
    }
  }


  $scope.removeLift = function(lift,event){
    console.log(lift);
      $http.delete('/workoutapi/' + lift["_id"]).success(function(event){
        $scope.fetch();

      });
  }

  $scope.addSets = function(sets,lift,event){
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
      //console.log('We got it');
      $scope.workout = data;
      //console.log($scope.workout);

    });
  };



  $scope.fetch();




});
