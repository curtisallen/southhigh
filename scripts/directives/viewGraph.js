'use strict';

angular.module('southhighApp').directive('graphView', function($log, $rootScope) {
	// constants
	var margin = 15,
		width = $('.container').width(),
		height = $('body').height() - margin,
		color = d3.scale.category20(),
		nodes = [],
		links = [],
		force,
		trans,
		scale;

	return {
	  restrict: 'E',
	  terminal: true,
	  scope: {
	    val: '='
	  },
	  link: function(scope, element, attrs) {
	  	// set up initial svg object
	  	var vis = d3.select(element[0])
	  	  .append('svg:svg')
	  	  .attr('width', width)
	  	  .attr('height', height + margin);
	  	  //.call(d3.behavior.zoom().on("zoom", rescale));

	  	var innerG = vis.append("g");

	  	function rescale() {
	  	  trans = d3.event.translate;
	  	  scale = d3.event.scale;

	  	  innerG.attr("transform",
	  	    "translate(" + trans + ")" + " scale(" + scale + ")");
	  	  force.resume();
	  	};

	  	d3.select(window).on("resize", resize);
	  	function resize() {
	  	  // $log.log("Resizing");
	  	  width = $('.container').width(),
	  	  height = $('body').height() - margin;
	  	  innerG.attr("width", width).attr("height", height);
	  	  // force.size([width, height]).resume();
	  	};

	  	force = d3.layout.force()
	  	  .charge(-6000)
	  	  .gravity(0.8)
	  	  .theta(0.4)
	  	  .linkDistance(75)
	  	  .size([width, height]);

	  	scope.$watch('val', function(newVal, oldVal) {
	  		// Clear the elements inside of the directive
	  		innerG.selectAll('*').remove();

	  		// if 'val' is undefined exit
	  		if(!newVal) {
	  			return;
	  		}
	  		// if val is empty
	  		if($.isEmptyObject(newVal)) {
	  			return;
	  		}
	  		// compute links
	  		var computedLinks = []; 
	  		angular.forEach(newVal.nodes, function(value, key){
	  			if(!value.type) { // this in not a device node
	  				if(value.belongsTo === 'iPhone') {
	  					this.push({source: 0, target: key});
	  				} else if(value.belongsTo === 'Android') {
	  					this.push({source: 1, target: key});
	  				} else {
	  					this.push({source: 2, target: key});
	  				}
	  			}
	  		}, computedLinks);
	  		// add the new data
	  		force.nodes(newVal.nodes)
	  			.links(computedLinks)
	  			.start();

	  		// draw nodes and links
	  		var link = innerG.selectAll(".link")
	  			.data(computedLinks)
	  			.enter().append("line")
	  			.attr("class", "link")
	  			.style("stroke-width", function(d) {
	  				return Math.sqrt(3);
	  			});

	  		var node = innerG.selectAll(".node")
	  			.data(newVal.nodes)
	  			.enter().append("g");
	  			node.attr("class", "node")
	  			.append("circle")
	  			.attr("r", function(d) {
	  				if(d.type) {
	  					return 50;
	  				} else {
	  					return 10;
	  				}
	  				
	  			}).style("fill", function(d) {
	  				if(d.type) {
	  					return color(1);
	  				} else {
	  					return "#FF9900";
	  				}
	  				
	  			});
	  		// add names for device nodes
	  		node.append("text")
	  			.attr("x", -25)
	  			.attr("dy", ".25em")
	  			.text(function(d) {
	  				if(d.type) {
	  					return d.name;
	  				} else {
	  					return;
	  				}
	  			});
	  		node.call(force.drag);

	  		force.on("tick", function() {
	  		  link.attr("x1", function(d) {
	  		    return d.source.x;
	  		  })
	  		    .attr("y1", function(d) {
	  		    return d.source.y;
	  		  })
	  		    .attr("x2", function(d) {
	  		    return d.target.x;
	  		  })
	  		    .attr("y2", function(d) {
	  		    return d.target.y;
	  		  });

	  		  node.attr("transform", function(d) {
	  		    return "translate(" + d.x + "," + d.y + ")";
	  		  });
	  		});
	  	});

	  }
	}
});