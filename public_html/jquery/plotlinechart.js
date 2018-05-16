$(document).ready(function () {
    var svgwidht=1000,svgheight=500;
    var margin = {
        top: 30,
        right: 20,
        bottom: 30,
        left: 50
    };
    var width = 1000 - margin.left - margin.right;
    var height = 500  - margin.top - margin.bottom;

    var parseDate = d3.time.format("%d-%b-%y").parse;
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
            .orient("left").ticks(5);
//To draw line  from one point to another point with xaxispoint d.date and yaxispoint d.close 
//    var valueline = d3.svg.line()
//            .x(function (d) {
//                return x(d.date);
//            })
//            .y(function (d) {
//                return y(d.close);
//            });

    var svg = d3.select("body")
            .append("svg")
            .attr("width", svgwidht)
            .attr("height", svgheight)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    var data = [{
            date: "1-May-16",
            close: "58.13"
        }, {
            date: "30-Apr-15",
            close: "53.98"
        }, {
            date: "27-Apr-12",
            close: "67.00"
        }, 
        {
            date: "26-Apr-12",
            close: "89.70"
        }, {
            date: "25-Apr-12",
            close: "99.00"
        }];

    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

// Scale the range of the data
    x.domain(d3.extent(data, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(data, function (d) {
            return d.close;
        })]);
    console.log('datat',data)
//    svg.append("path") // Add the valueline path.
//            .attr("d", valueline(data));//d is to specify points from data variable....see example of path in w3school ...we will get d
    svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    svg.append("g") // Add the Y Axis
            .attr("class", "y axis")
            .call(yAxis);
});