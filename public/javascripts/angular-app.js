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


  $scope.modelCache = [];
  $scope.updatePosition = function(models) {
    for (var model in models) {
      models[model].Position = model;
      //console.log(models[model].Name);
      //console.log(models[model].Position);
      patchRequest(models[model]._id,model,models[model].Name);
    }

  }
    $scope.workoutConfig = {

      onEnd: function(evt) {
        if (evt.model == undefined) {
          console.log('someone did not move one');
        } else if (evt.model != undefined && evt.newIndex != undefined) {
          console.log('something got moved!');
          $scope.modelCache = (evt.models);
          console.log($scope.modelCache);
          $scope.updatePosition($scope.modelCache);
        }
      }
    };

    function patchRequest(id, newPosition, name) {
      $http.patch('/workoutapi/'+ id,{Position: newPosition})
        .then(function(data, status){
        console.log('updated ' + name +' position to ' + newPosition);
      });
    };



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
      $http.get('/usersworkouts').success(function(data) {
        //console.log('We got it');
        console.log(data);
        $scope.workout = data;
        $scope.modelCache = data;
        console.log($scope.modelCache);
        //console.log($scope.workout);

      });
    };



    $scope.fetch();





  });
