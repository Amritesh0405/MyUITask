$(document).ready(function () {
    var data = [{"letter": "A", "frequency": .08167, "open": "897"},
        {"letter": "B", "frequency": .01492, "open": "997"},
        {"letter": "C", "frequency": .02780, "open": "765"},
        {"letter": "D", "frequency": .04253, "open": "666"},
        {"letter": "E", "frequency": .12702, "open": "200"},
        {"letter": "F", "frequency": .02288, "open": "800"},
        {"letter": "G", "frequency": .02022, "open": "390"},
        {"letter": "H", "frequency": .06094, "open": "600"},
        {"letter": "I", "frequency": .06973, "open": "400"},
        {"letter": "J", "frequency": .00153, "open": "700"},
        {"letter": "K", "frequency": .00747, "open": "900"},
        {"letter": "L", "frequency": .04025, "open": "500"},
        {"letter": "M", "frequency": .02517, "open": "670"},
        {"letter": "N", "frequency": .06749, "open": "890"},
        {"letter": "O", "frequency": .07507, "open": "700"},
        {"letter": "P", "frequency": .01929, "open": "546"},
        {"letter": "Q", "frequency": .00098, "open": "887"},
        {"letter": "R", "frequency": .05987, "open": "812"},
        {"letter": "S", "frequency": .06333, "open": "660"},
        {"letter": "T", "frequency": .09056, "open": "850"},
        {"letter": "U", "frequency": .02758, "open": "802"},
        {"letter": "V", "frequency": .01037, "open": "850"},
        {"letter": "W", "frequency": .02465, "open": "865"},
        {"letter": "X", "frequency": .00150, "open": "811"},
        {"letter": "Y", "frequency": .01971, "open": "1100"},
        {"letter": "Z", "frequency": .00574, "open": "444"}];

    var margin = {top: 20, right: 35, bottom: 30, left: 40},
            width = 1000 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

    var x2 = d3.scale.ordinal()
            .rangeBands([0, width], 0);

    var y = d3.scale.linear()
            .range([height, 0]);

    var y0 = d3.scale.linear()
            .range([height, 0]);

    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

    var yAxisLeft = d3.svg.axis().scale(y)
            .orient("left").ticks(5)
            .tickFormat(formatPercent);

    var yAxisRight = d3.svg.axis().scale(y0)
            .orient("right").ticks(5);


    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function (d) {
        d.frequency = +d.frequency;
        d.open = +d.open;
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
    y0.domain([0, d3.max(data, function (d) {
            return Math.max(d.open);
        })]);
    svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g")
            .attr("class", "y axis")
            .call(yAxisLeft)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");
    svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (width) + " ,0)")
            .style("fill", "red")
            .call(yAxisRight)
//            .attr("y", 6)
//            .attr("dy", ".72em")
//            .style("text-anchor", "end")
//            .text("open");
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
            });

    var dataSum = d3.sum(data, function (d) {
        return d.frequency;
    });

    var line = d3.svg.line()
            .x(function (d, i) {
                return x2(d.letter) + i;
            })
            .y(function (d, i) {
                return y(dataSum / data.length);
            });

    var valueline2 = d3.svg.line()
            .x(function (d) {
                return x(d.letter);
            })
            .y(function (d) {
                return y0(d.open);
            });

    svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

    svg.append("path")        // Add the valueline2 path.
            .style("stroke", "red")
            .attr("d", valueline2(data));


});
