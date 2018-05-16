$(document).ready(function () {
var network = {
  // Start data
  graph: {
    "nodes":[
      {"id":1,"name":"Jack Hayes","colour":"#567e7b","connections":2},
      {"id":2,"name":"Amy Castillo","colour":"#85ed67","connections":2},
      {"id":3,"name":"Kenneth Williams","colour":"#666b01","connections":1},
      {"id":4,"name":"Phillip Hicks","colour":"#49d159","connections":3},
      {"id":5,"name":"Ryan Ortiz","colour":"#47f1ee","connections":2},
      {"id":6,"name":"Edward Moore","colour":"#05626d","connections":0},
      {"id":7,"name":"Frances Gomez","colour":"#8ee92f","connections":2},
      {"id":8,"name":"Julia Adams","colour":"#73e14b","connections":0},
      {"id":9,"name":"Martha Montgomery","colour":"#0b9b89"}],
    "links":[
      {"source":8,"target":4},
      {"source":5,"target":7},
      {"source":3,"target":5},
      {"source":2,"target":1},
      {"source":7,"target":2},
      {"source":6,"target":5},
      {"source":6,"target":1},
      {"source":8,"target":2},
      {"source":8,"target":7},
      {"source":7,"target":4},
      {"source":1,"target":4},
      {"source":1,"target":3}]
  },
  // Graph design
  width: 500,
  height: 500,
  lines: {
		stroke: {
			color: "black",
			thickness: 2
		}
	},
	nodes: {
		fill: {
			color: "#333"
		},
		stroke: {
			color: "#fff",
			thickness: 3
		},
		sizeRange: [8,30]
	},
	setup: function(){
	  var $network = $("#network");
	  
	  $('<canvas/>').attr({
			'id':'networkCanvas',
			'width':this.width,
			'height':this.height
		}).appendTo($("#network"));
		
		this.canvas = document.getElementById('networkCanvas');
		this.context = this.canvas.getContext('2d');
		
		this.simulation = d3.forceSimulation()
			.stop()
			.force("link",d3.forceLink().id(function(d){return d.id}))
			.force("change",d3.forceManyBody())
			.force("center",d3.forceCenter())
			.force("collide",d3.forceCollide().radius(function (d){return d.force;})
                        .iterations(2))
			.on("tick",ticked()
			);
                this.drawData(this.graph);
        },
	forceScale: function(node){
    var scale = d3.scaleLog().domain(this.nodes.sizeRange).range(this.nodes.sizeRange.slice().reverse());
    return node.r + scale(node.r);
	},
	drawData: function(graph){
	  var countExtent = d3.extent(graph.nodes,function(d){return d.connections}),
				radiusScale = d3.scalePow().exponent(2).domain(countExtent).range(this.nodes.sizeRange);

    // Let D3 figure out the forces
		for(var i=0,ii=graph.nodes.length;i<ii;i++) {
			var node = graph.nodes[i];

			node.r = radiusScale(node.connections);
			node.force = this.forceScale(node);
		};

    // Add new data to old data
		this.graph.nodes = this.graph.nodes.concat(graph.nodes);
		this.graph.links = this.graph.links.concat(graph.links);

    // Feed to simulation
		this.simulation
			.nodes(this.graph.nodes);

		this.simulation.force("link")
			.links(this.graph.links);

		this.simulation.alpha(0.3).restart();
	},
	ticked:function(){
	  if(!this.graph) {
			return false;
		}

		this.context.clearRect(0,0,this.width,this.height);
		this.context.save();
		this.context.translate(this.width / 2, this.height / 2);

		this.context.beginPath();
		this.graph.links.forEach(function(d){
			this.context.moveTo(d.source.x, d.source.y);
			this.context.lineTo(d.target.x, d.target.y);
		});
		this.context.strokeStyle = this.lines.stroke.color;
		this.context.lineWidth = this.lines.stroke.thickness;

		this.context.stroke();
		
		this.graph.nodes.forEach(function(d){
			this.context.beginPath();
			
			this.context.moveTo(d.x + d.r, d.y);
			this.context.arc(d.x, d.y, d.r, 0, 2 * Math.PI);

			this.context.fillStyle = d.colour;
			this.context.strokeStyle =this.nodes.stroke.color;
			this.context.lineWidth = this.nodes.stroke.thickness;
			this.context.fill();
			this.context.stroke();
		});
	
		this.context.restore();
	}
};

var lastId = 9;

var getRandomColor = function(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

var addNode = function(){
  var newGraph = {
    nodes: [{
      name: "Name-"+(++lastId),
      id: lastId,
      colour: getRandomColor(),
      connections: 1
    }],
    links: [{
      source: 1,
      target: lastId
    }]
  };
  console.log(newGraph);
  network.drawData(newGraph);
};

$(function(){
  network.setup();
  
  $("#addNode").click(addNode);
});
});