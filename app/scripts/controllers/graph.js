'use strict';

angular.module('southhighApp')
  .controller('GraphCtrl', ['$scope', function ($scope) {

  	var deviceIndex = {
  			iPhone : 0,
  			Android: 1,
  			Other: 3
  		};

    $scope.graph = {
    	nodes : [
    		{"name": "iPhone", "type": "device"},
    		{"name": "Android", "type": "device"},
    		{"name": "Other", "type": "device"},
    		{"name": "random", "belongsTo": "iPhone"},
    		{"name": "random", "belongsTo": "iPhone"},
    		{"name": "random", "belongsTo": "iPhone"},
    		{"name": "random", "belongsTo": "Android"},
    		{"name": "random", "belongsTo": "Android"},
    		{"name": "random", "belongsTo": "Android"},
    		{"name": "random", "belongsTo": "Other"},
    		{"name": "random", "belongsTo": "Other"}
    	],
    	links : [
    	]
    };
}]);
