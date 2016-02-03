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
    onEnd: function(evt) {
      console.log(evt);
      var oldIndex = evt.oldIndex + 1;
      var newIndex = evt.newIndex + 1;
      //console.log('old index onend == ' + oldIndex);
      //console.log('new index onend == ' + newIndex);
      if (newIndex && newIndex != oldIndex) {
      console.log('your index changed!!!');
      console.log(evt.model._id);
      console.log(evt.model.Name);
      patchRequest(evt.model._id,newIndex,evt.model.Name);
      var direction = newIndex - oldIndex;
        if (direction > 0) {
          console.log('your index increased, you moved your lift down');
          for (var model in evt.models) {
            if (evt.models[model].Position <= newIndex && evt.models[model].Position > oldIndex && evt.models[model]._id != evt.model._id) {
              var newPosition = parseInt(evt.models[model].Position) - 1;
              console.log('-------');
              console.log(evt.models[model].Name);
              console.log(newPosition);
              patchRequest(evt.models[model]._id,newPosition,evt.models[model].Name);
              $scope.fetch();
            }
          }
        } else {
          console.log('your index decreased, you moved your lift up');
          for (var model in evt.models) {
            if (evt.models[model].Position >= newIndex && evt.models[model].Position < oldIndex && evt.models[model]._id != evt.model._id) {
              var newPosition = parseInt(evt.models[model].Position) + 1;
              console.log('-------')
              console.log(evt.models[model].Name);
              console.log(newPosition);
              patchRequest(evt.models[model]._id,newPosition,evt.models[model].Name);
              $scope.fetch();
            }
          }

        }
      } else {
        console.log('yo index did not change.');
      }
    }
  }

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
    $http.get('/workoutapi').success(function(data) {
      //console.log('We got it');
      $scope.workout = data;
      //console.log($scope.workout);

    });
  };



  $scope.fetch();




});
