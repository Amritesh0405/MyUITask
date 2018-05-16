$(document).ready(function () {
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
//    Get the data
    var data = [{
            date: 1,
            close: 5
        }, {
            date: 20,
            close: 20
        }, {
            date: 40,
            close: 10
        }, {
            date: 60,
            close: 40
        }, {
            date: 80,
            close: 5
        }, {
            date: 100,
            close: 60
        }];
    var x = d3.scale.linear().range([margin.left, width - margin.right]).domain([d3.min(data, function (d) {
            return d.date;
        }), d3.max(data, function (d) {
            return d.date;
        })]);
    var y = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([d3.min(data, function (d) {
            return d.close;
        }), d3.max(data, function (d) {
            return d.close;
        })]);
    var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5).tickSubdivide(true);
    var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5).tickSubdivide(true);
//To draw line  from one point to another point with xaxispoint d.date and yaxispoint d.close 
    var valueline = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.close);
            })
            .interpolate('linear');
    var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.append("path") // Add the valueline path.
            .attr("d", valueline(data));//d is to specify points from data variable....see example of path in w3school ...we will get d
    svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis);
    svg.append("g") // Add the Y Axis
            .attr("class", "y axis")
            .attr('transform', 'translate(' + (margin.left) + ',0)')
            .call(yAxis);
});