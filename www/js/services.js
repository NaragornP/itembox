angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Items', ['$http',function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  return {
      getAll: function(callback) {
        $http.get('/getItem')
          .success(function(data) {
            callback(data);
          }).
        error(function(data) {
          callback({
            error: 1
          });
        });
      },
      addItem: function(inputItem, inputBox,callback) {
        var tmp = {
          name: inputItem,
          boxname: inputBox
        };
   

        $http.get('/addItem',{params : tmp})
          .success(function(data) {
            callback(data);
          }).
        error(function(data) {
          callback({
            error: 1
          });
        });
       },
      delete: function(index, callback) {
        $http.get('/removeItem/'+index)
          .success(function(data) {
            callback(data);
          }).
        error(function(data) {
          callback({
            error: 1
          });
        });
      },
      edit: function(page, callback) {


        $http.get('/updateItem/'+page._id, {params : page})
          .success(function(data) {
            callback(data);
          }).
        error(function(data) {
          callback({
            error: 1
          });
        });
      }
    };


}]);
