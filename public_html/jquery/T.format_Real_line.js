$(document).ready(function () {
    var response = {"totalcount": 6, "pagecount": 6, "response": [{"adrequest": "", "adimpression": 147, "timestamp": "1498193100", "adplay": 144, "aderror": 208}, {"adrequest": "", "adimpression": 154, "timestamp": "1498193400", "adplay": 153, "aderror": 211}, {"adrequest": "", "adimpression": 178, "timestamp": "1498193700", "adplay": 175, "aderror": 184}, {"adrequest": "", "adimpression": 208, "timestamp": "1498194000", "adplay": 207, "aderror": 247}, {"adrequest": "", "adimpression": 176, "timestamp": "1498194300", "adplay": 172, "aderror": 192}, {"adrequest": "", "adimpression": 178, "timestamp": "1498194600", "adplay": 175, "aderror": 219}], "countries": []};
    var second_array = [];
    $.each(response.response, function (key, value) {
        second_array.push({"timestamp": value.timestamp, "adimpression": value.adimpression});
    });

    var svgwidht = 1000, svgheight = 500;
    var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    };
    var width = 1000 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    second_array.forEach(function (d) {
        d.timestamp = new Date(d.timestamp * 1000);
    });
    var timeFormat = d3.time.format("%c");

    var x = d3.time.scale().range([margin.left, width - margin.right]).domain([d3.min(second_array, function (d) {
            return d.timestamp;
        }), d3.max(second_array, function (d) {
            return d.timestamp;
        })]);
    var y = d3.scale.linear().range([height - margin.top, margin.bottom]).domain([d3.min(second_array, function (d) {
            return d.adimpression;
        }), d3.max(second_array, function (d) {
            return d.adimpression;
        })]);
    var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5)
            .tickFormat(timeFormat);
    var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);
    var valueline = d3.svg.line()
            .x(function (d) {
                return x(d.timestamp);
            })
            .y(function (d) {
                return y(d.adimpression);
            })
            .interpolate('linear');
    var svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.append("path") // Add the valueline path.
            .attr("d", valueline(second_array));//d is to specify points from second_array variable....see example of path in w3school ...we will get d
    svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(xAxis);
    svg.append("g") // Add the Y Axis
            .attr("class", "y axis")
            .attr('transform', 'translate(' + (margin.left) + ',0)')
            .call(yAxis);
});
