$(document).ready(function () {
    var data = [
        {"month": "jan", "fruits": .01492, "flowers": "997"},
        {"month": "feb", "fruits": .02780, "flowers": "765"},
        {"month": "mar", "fruits": .03892, "flowers": "817"},
        {"month": "apr", "fruits": .07780, "flowers": "446"},
        {"month": "may", "fruits": .08780, "flowers": "655"}];
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
    var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    data.forEach(function (d) {
        d.fruits = +d.fruits;
        d.flowers = +d.flowers;
    });
    x.domain(data.map(function (d) {
        return d.month;
    }));
    x2.domain(data.map(function (d) {
        return d.month;
    }));
    y.domain([0, d3.max(data, function (d) {
            return d.fruits;
        })]);
    y0.domain([0, d3.max(data, function (d) {
            return Math.max(d.flowers);
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
            .text("fruits");
    svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (width) + " ,0)")
            .style("fill", "red")
            .call(yAxisRight)
//            .attr("y",-6)
//            .attr("dy", ".71em")
//            .style("text-anchor", "end")
//            .text("flowers");
    svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.month);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.fruits);
            })
            .attr("height", function (d) {
                return height - y(d.fruits);
            });
//    var dataSum = d3.sum(data, function (d) {
//        return d.frequency;
//    });
    var line = d3.svg.line()
            .x(function (d, i) {
                return x2(d.month) + i;
            })
            .y(function (d, i) {
                return y(d.fruits);
            });
    var valueline2 = d3.svg.line()
            .x(function (d) {
                return x(d.month);
            })
            .y(function (d) {
                return y0(d.flowers);
            });
    svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    svg.append("path")        // Add the valueline2 path.
            .style("stroke", "red")
            .attr("d", valueline2(data));
    svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .style("fill", "green")
            .attr("cx", function (d) {
                return x(d.month);
            })
            .attr("cy", function (d) {
                return y0(d.flowers);
            })
            .on("mouseover", function (d) {
                div.transition()
                        .duration(200)
                        .style("opacity", .9);
                div.html((d.month) + "<br/>" + d.flowers)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                        .duration(500)
                        .style("opacity", 0);
            });
            
    svg.selectAll("dot")
            .data(data)
            .enter().append("circle")
            .attr("r", 5)
            .style("fill", "red")
            .attr("cx", function (d) {
                return x2(d.month);
            })
            .attr("cy", function (d) {
                return y(d.fruits);
            })
            .on("mouseover", function (d) {
                div.transition()
                        .duration(200)
                        .style("opacity", .9);
                div.html((d.month) + "<br/>" + d.fruits)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                        .duration(500)
                        .style("opacity", 0);
            });
             
});


