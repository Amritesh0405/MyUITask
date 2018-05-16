$(document).ready(function () {
    function Dynamicchart() {
        $("#chart").empty();
        var response = {"totalcount": 7, "pagecount": 7, "response": [{"concurviewavg": 1959, "viewercount": 993473, "timestamp": "1498193100", "playdur": -9.26173857831E7}, {"concurviewavg": 4136, "viewercount": 895565, "timestamp": "1498193400", "playdur": -1.570578045342E8}, {"concurviewavg": 4140, "viewercount": 823112, "timestamp": "1498193700", "playdur": -1.425112781024E8}, {"concurviewavg": 3243, "viewercount": 667606, "timestamp": "1497484800", "playdur": 1.153223066138E8}, {"concurviewavg": 2257, "viewercount": 657015, "timestamp": "1496361600", "playdur": 8.64436686556E7}, {"concurviewavg": 2705, "viewercount": 618614, "timestamp": "1496448000", "playdur": 6.72249488011E7}, {"concurviewavg": 1735, "viewercount": 771300, "timestamp": "1497744000", "playdur": 7.58869201468E7}], "countries": []};
        var second_array = [];
        $.each(response.response, function (key, value) {
            second_array.push({"timestamp": parseInt(value.timestamp), "playdur": value.playdur});
        });
        var margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 80
        };
        width = $("#chart").width() - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom;
        second_array.forEach(function (d) {
            d.timestamp = new Date(d.timestamp * 1000);
        });
        var timeFormat = d3.time.format("%c").parse;
//        console.log(timeFormat)
        var Formatter = d3.format(",.4e").parse;
        var y = d3.scale.linear()
                .range([height, 0])
                .domain(d3.extent(second_array, function (d) {
                    return d.playdur;
                })).nice();
//        var x = d3.scale.ordinal()
//                .rangeRoundBands([0, width], .2)
//                .domain(second_array.map(function (d) {
//                    console.log(d.timestamp)
//                    return d.timestamp;
//                }));
        var x = d3.scale.ordinal()// ordinal scale function for the x-axis data.
                .rangeRoundBands([0, width], .1).domain(second_array.map(function (d) {
            return d.timestamp;
        }));
        var maxtimestamp = d3.max(second_array, function (d) {
            return d.timestamp;
        });
        var mintimestamp = d3.min(second_array, function (d) {
            return d.timestamp;
        });
        var xAxisScale = d3.time.scale()
                .domain([mintimestamp, maxtimestamp])
                .range([0, width]);

        var xAxis = d3.svg.axis()
                .scale(xAxisScale)
                .orient("bottom")
//                .tickFormat(timeFormat);

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(Formatter);
        var svg = d3.select("#chart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.selectAll(".bar")
                .data(second_array)
                .enter().append("rect")
                .attr("class", function (d) {

                    if (d.playdur < 0) {
                        return "bar negative";
                    } else {
                        return "bar positive";
                    }

                })
                .attr("data-yr", function (d) {
                    return d.timestamp;
                })
                .attr("data-c", function (d) {
                    return d.playdur;
                })
                .attr("title", function (d) {
                    return (d.timestamp + ": " + d.playdur + " °C");
                })
                .attr("y", function (d) {

                    if (d.playdur > 0) {
                        return y(d.playdur);
                    } else {
                        return y(0);
                    }
                })
                .attr("x", function (d) {
                    return x(d.timestamp);
                })
                .attr("width", x.rangeBand())
                .attr("height", function (d) {
                    return Math.abs(y(d.playdur) - y(0));
                })
                .on("mouseover", function (d) {
                    // alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
                    d3.select("#_yr")
                            .text("Year:" + d.timestamp);
                    d3.select("#degrree")
                            .text(d.playdur + "°C");
                });
        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

        svg.append("g")
                .attr("class", "y axis")
                .append("text")
                .text("°Celsius")
                .attr("transform", "translate(15, 40), rotate(-90)");

        svg.append("g")
                .attr("class", "X axis")
                .attr("transform", "translate(" + (margin.left - 6.5) + "," + height + ")")
                .call(xAxis);

        svg.append("g")
                .attr("class", "x axis")
                .append("line")
                .attr("y1", y(0))
                .attr("y2", y(0))
                .attr("x2", width);

        svg.append("g")
                .attr("class", "infowin")
                .attr("transform", "translate(50, 5)")
                .append("text")
                .attr("id", "_yr");

        svg.append("g")
                .attr("class", "infowin")
                .attr("transform", "translate(110, 5)")
                .append("text")
                .attr("id", "degrree");
        function type(d) {
            d.playdur = +d.playdur;
            return d;
        }
    }
    Dynamicchart();
    $(window).resize(function () {
        Dynamicchart();
    });
});