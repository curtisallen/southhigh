'use strict';

angular.module('southhighApp')
  .controller('GraphCtrl', ['$scope', 'angularFire', function ($scope, angularFire) {

  	var deviceIndex = {
  			iPhone : 0,
  			Android: 1,
  			Other: 3
  		};

  	var ref = new Firebase('https://southhigh.firebaseio.com/');
  	angularFire(ref, $scope, 'graph');

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
    	]
    };

    $scope.reset = function() {
    	$scope.graph = {
    		nodes : [
	    		{"name": "iPhone", "type": "device"},
	    		{"name": "Android", "type": "device"},
	    		{"name": "Other", "type": "device"}
    		]
    	};
    };
}]);
