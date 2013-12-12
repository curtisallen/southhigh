'use strict';

angular.module('southhighApp')
  .controller('MainCtrl', [ '$scope', '$log', 'angularFire', function ($scope, $log, angularFire) {
    var ref = new Firebase('https://southhigh.firebaseio.com/');
    var fire = angularFire(ref, $scope, 'graph');

    // when the data arrives 
    fire.then(function(success) {
    	$scope.detectDevice();
    });
    
    $scope.detectDevice = function() {
    	var userAgent = navigator.userAgent;
    	$log.log(userAgent);

    	// check user agent for client
    	if(userAgent.contains('iPhone')) {
    		$log.log("found iPhone");
    		$scope.graph.nodes.push({"name": "random", "belongsTo":"iPhone"});
    	} else if(userAgent.contains('Android')) {
    		$log.log("found Android");
    		$scope.graph.nodes.push({"name": "random", "belongsTo":"Android"});
    	} else {
    		$log.log("found Other");
    		$scope.graph.nodes.push({"name": "random", "belongsTo":"Other"});
    	}
    }
    
  }]);
