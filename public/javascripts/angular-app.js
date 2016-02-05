var liftsApp = angular.module('liftsApp', ['ng-sortable']).config(function($interpolateProvider){
      $interpolateProvider.startSymbol('//');
      $interpolateProvider.endSymbol('//');
    });



liftsApp.controller('BuilderCtrl', function($scope,$http) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  $scope.saveWorkoutName = function(name){
    console.log(name);
    var lifts = document.getElementsByClassName('cardInWorkoutBuilder')
    console.log(lifts);
    for (var lift in lifts) {
      var liftID = lifts[lift].firstElementChild.value;
      $http.patch('/workoutapi/' + liftID, {workoutName: name}).then(console.log('success'));
    }
  }

  $scope.builderConfig = {
    group: {name:'workout', put: true},
    onAdd: function(evt){
      var user = $('#userInput').val();
      if ($('#nameWorkout').val().length > 0) {
        var workoutName = $('#nameWorkout').val();
      }
      //else {
        //var workoutName = $('#nameWorkout').prop('placeholder');
      //};
      console.log("-----------"+workoutName);
      console.log(user);
      console.log('a lift got added');
      $.ajax({
        url: '/workoutapi',
        type: 'POST',
        data: {
          Name: evt.model.Name,
          Description: evt.model.Description,
          User: user,
          workoutName: workoutName
        }
      })
      .success(function() {
        console.log("success");
        $scope.fetch();
      })
      .fail(function() {
        console.log("error");
      });

       }
    }


    $scope.removeLift = function(lift){
      console.log(lift.Name);
      console.log(lift._id);
        $http.delete('/workoutapi/' + lift._id).then(function(){
          console.log('your lift is gone from the API');
        });
      $scope.fetch();
    }

  $scope.fetch = function(){
    $http.get('/usersworkouts').success(function(data) {
      console.log('Data Received');
      if (data.length != undefined) {
        $scope.data = data;
      } else {
        data = [];
      //console.log($scope.lifts);
      }
    });
  };

  $scope.fetch();

});







liftsApp.controller('LiftListCtrl', function($scope, $http){

  $scope.liftsListSortable = {
    group: {name:'workout', pull: 'clone', put: false},
    onEnd: function(evt){
      //console.log(evt)
    },
  }



  $scope.fetch = function(){
    $http.get('/api').success(function(data) {
      console.log('Data Received');
      $scope.lifts = data;
      //console.log($scope.lifts);
    });
  };

  // $scope.addTo = function(name, description, event){
  //   var user = $('#userInput').val();
  //   console.log('------user------')
  //   console.log(user);
  //   $http({
  //     method: 'POST',
  //     url: '/workoutapi',
  //     data: {
  //       Name: name,
  //       Description: description,
  //       User: user
  //     }
  //   })
  //   .then(function successCallback(response) {
  //     event.preventDefault();
  //     console.log(response);
  //   }, function errorCallback(response) {
  //     console.log(response);
  //   });
  // }


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
      patchRequest(models[model]._id,model,models[model]);
    }

  }
    $scope.workoutConfig = {

      onEnd: function(evt) {
        if (evt.model == undefined) {
          console.log('someone did not move one');
        } else if (evt.model != undefined && evt.newIndex != undefined && evt.newIndex != evt.oldIndex) {
          console.log('something got moved!');
          // $scope.modelCache = (evt.models);
          // console.log($scope.modelCache);
          $scope.updatePosition(evt.models);
        }
      }
    };

    function patchRequest(id, newPosition, model) {
      model.Position = newPosition;
      $http.patch('/workoutapi/'+ id,{Position: newPosition})
        .then(function(data, status){
        console.log('updated ' + model.Name +' position to ' + newPosition);
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
        $scope.modelCache = data.sort(function (a,b) {
          if (a.Position > b.Position) {
            return 1;
          }
          if (a.Position < b.Position) {
            return -1;
          }
          return 0;
        });
        //$scope.modelCache = data;
        //console.log($scope.modelCache);
        //console.log($scope.workout);

      });
    };



    $scope.fetch();





  });
