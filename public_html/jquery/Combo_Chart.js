$(document).ready(function () {
    var data = [{"letter": "A", "frequency": .08167},
        {"letter": "B", "frequency": .01492},
        {"letter": "C", "frequency": .02780},
        {"letter": "D", "frequency": .04253},
        {"letter": "E", "frequency": .12702},
        {"letter": "F", "frequency": .02288},
        {"letter": "G", "frequency": .02022},
        {"letter": "H", "frequency": .06094},
        {"letter": "I", "frequency": .06973},
        {"letter": "J", "frequency": .00153},
        {"letter": "K", "frequency": .00747},
        {"letter": "L", "frequency": .04025},
        {"letter": "M", "frequency": .02517},
        {"letter": "N", "frequency": .06749},
        {"letter": "O", "frequency": .07507},
        {"letter": "P", "frequency": .01929},
        {"letter": "Q", "frequency": .00098},
        {"letter": "R", "frequency": .05987},
        {"letter": "S", "frequency": .06333},
        {"letter": "T", "frequency": .09056},
        {"letter": "U", "frequency": .02758},
        {"letter": "V", "frequency": .01037},
        {"letter": "W", "frequency": .02465},
        {"letter": "X", "frequency": .00150},
        {"letter": "Y", "frequency": .01971},
        {"letter": "Z", "frequency": .00074}];
    var color = ['orange', 'blue', 'red', 'green', 'black', 'pink', 'brown', 'purple','steelblue','lightgreen','violet','orange', 'blue', 'red', 'green', 'black', 'pink', 'brown', 'purple','steelblue','lightgreen','violet'];
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

    var x2 = d3.scale.ordinal()
            .rangeBands([0, width], 0);


    var y = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function (d) {
        d.frequency = +d.frequency;
    });


    x.domain(data.map(function (d) {
        return d.letter;
    }));
    x2.domain(data.map(function (d) {
        return d.letter;
    }));
    y.domain([0, d3.max(data, function (d) {
            return d.frequency;
        })]);

    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");

    svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.letter);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.frequency);
            })
            .attr("height", function (d) {
                return height - y(d.frequency);
            })
            .attr("fill", function (d,i) {
                return color[i];
            });
//    var dataSum = d3.sum(data, function (d) {   
//        return d.frequency;
//    });   In order to sum data and find mid of data this above line are coded

    var line = d3.svg.line()
            .x(function (d, i) {
                return x2(d.letter) + i;
            })
            .y(function (d, i) {
                return y(d.frequency);// In order to draw a line at mid of bar do  "return y(dataSum/data.length);"
            });

    svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
});


