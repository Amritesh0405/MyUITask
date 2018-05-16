$(document).ready(function () {
//Create the SVG Viewport
    var svgContainer = d3.select("body").append("svg")
    var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    /*defining scale for x axis and y axis with range and domain*/
    var x = d3.scale.linear().range([0, width]).domain([0, 100]);
    var y = d3.scale.linear().range([height, 0]).domain([100, 1000]);
    /*defining x axis and y axis*/
    var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);
    var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);
    /*Appending svg to body with width and height */
    var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// Add the X Axis
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
// Add the Y Axis
    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
});
