angular.module('starter.controllers', [])

.controller('HomeCtrl', ['$scope','Items', function($scope,Items) {
 	$scope.items = [];
      Items.getAll(function(data){
      $scope.items = data;
    });


      $scope.edit = function(item) {
      Items.edit(item, function(data){
        // Items.getAll(function(data){
        //   $scope.items = data;
        // });
      });
    };

    $scope.delete = function(_id){
      Items.delete(_id, function(data){
        Items.getAll(function(data){
          $scope.items = data;
        });
      });
    };
}])

.controller('AddCtrl', ['$scope','Items', function($scope, Items) {
  
  $scope.addItem = function(inputItem,inputBox) {
      Items.addItem(inputItem,inputBox, function(data){
        Items.getAll(function(data){
          $scope.items = data;
        });
      });
      
      alert('Sucess');
     };


}])

// .controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
//   $scope.friend = Friends.get($stateParams.friendId);
// })

// .controller('AccountCtrl', function($scope) {
// });

