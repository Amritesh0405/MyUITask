$(document).ready(function () {
var margin = {top: 20, right: 30, bottom: 40, left: 30},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        var data = [{
            "name": "A",
            "value": -15
        },
        {
            "name": "B",
            "value": -20
        },
        {
            "name": "C",
            "value": -22
        },
        {
            "name": "D",
            "value": -18
        },
        {
            "name": "E",
            "value": 2
        },
        {
            "name": "F",
            "value": 6
        },
        {
            "name": "G",
            "value": 26
        },{
            "name": "H",
            "value": 18
        }];
        var x = d3.scale.linear()
                .range([0, width])
                .domain(d3.extent(data, function (d) {
                return d.value;
                }))
                .nice();

        var y = d3.scale.ordinal()
                .rangeRoundBands([0, height], 0.1)
                .domain(data.map(function (d) {
                    return d.name;
                }));

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickSize(0)
                .tickPadding(6);

        var svg = d3.select("body").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", function (d) {
                    return "bar bar--" + (d.value < 0 ? "negative" : "positive");
                })
                .attr("x", function (d) {
                    return x(Math.min(0, d.value));
                })
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("width", function (d) {
                    return Math.abs(x(d.value) - x(0));
           
                })
                .attr("height", y.rangeBand());

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + x(0) + ",0)")
                .call(yAxis);
        function type(d) {
            d.value = +d.value;
            return d;
            }
            ;
        }
        );
