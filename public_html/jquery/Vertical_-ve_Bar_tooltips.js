$(document).ready(function () {
    function negativechart(){
        $("#chart").empty();
    var margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 30
    },
            width = $("#chart").width()- margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
    var data = [{
            Year: 1880,
            Celsius: -0.185
        }, {
            Year: 1881,
            Celsius: -0.08
        }, {
            Year: 1882,
            Celsius: -0.13
        }, {
            Year: 1883,
            Celsius: -0.175
        }, {
            Year: 1884,
            Celsius: -0.275
        }, {
            Year: 1885,
            Celsius: -0.275
        }, {
            Year: 1886,
            Celsius: 0.06
        }, {
            Year: 1887,
            Celsius: 0.069
        }, {
            Year: 1888,
            Celsius: 0.09
        }, {
            Year: 1889,
            Celsius: 0.05
        }, {
            Year: 1890,
            Celsius: 0.095
        }, {
            Year: 1891,
            Celsius: 0.066
        }, {
            Year: 1892,
            Celsius: -0.185
        }, {
            Year: 1893,
            Celsius: -0.185
        }, {
            Year: 1894,
            Celsius: -0.144
        }, {
            Year: 1895,
            Celsius: -0.122
        }, {
            Year: 1896,
            Celsius: -0.185
        }, {
            Year: 1897,
            Celsius: -0.112
        }];

    var y = d3.scale.linear()
            .range([height, 0])
            .domain(d3.extent(data, function (d) {
                return d.Celsius;
            })).nice();
    var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .2)
            .domain(data.map(function (d) {
                return d.Year;
            }));

    var xAxisScale = d3.scale.linear()
            .domain([1880, 1897])
            .range([0, width]);

    var xAxis = d3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom")
            .tickFormat(d3.format("d"));

    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

    var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", function (d) {

                if (d.Celsius < 0) {
                    return "bar negative";
                } else {
                    return "bar positive";
                }

            })
            .attr("data-yr", function (d) {
                return d.Year;
            })
            .attr("data-c", function (d) {
                return d.Celsius;
            })
            .attr("title", function (d) {
                return (d.Year + ": " + d.Celsius + " °C");
            })
            .attr("y", function (d) {

                if (d.Celsius > 0) {
                    return y(d.Celsius);
                } else {
                    return y(0);
                }
            })
            .attr("x", function (d) {
                return x(d.Year);
            })
            .attr("width", x.rangeBand())
            .attr("height", function (d) {
                return Math.abs(y(d.Celsius) - y(0));
            })
            .on("mouseover", function (d) {
                // alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
                d3.select("#_yr")
                        .text("Year: " + d.Year);
                d3.select("#degrree")
                        .text(d.Celsius + "°C");
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
        d.Celsius = +d.Celsius;
        return d;
    }
    }
    negativechart();
    $(window).resize(function(){
        negativechart();
    });
});