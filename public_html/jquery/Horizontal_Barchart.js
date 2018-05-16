$(document).ready(function () {
    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    var margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
    };
    var minData;
    var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
    var data = [{
            "name": "Apples",
            "value": 20
        },
        {
            "name": "Bananas",
            "value": 12
        },
        {
            "name": "Grapes",
            "value": 19
        },
        {
            "name": "Lemons",
            "value": 5
        },
        {
            "name": "Limes",
            "value": 16
        },
        {
            "name": "Oranges",
            "value": 26
        },
        {
            "name": "Pears",
            "value": 30
        }];
    //sort bars based on value( TO PLACE BARS ACCORDING TO VALUE.)
    data = data.sort(function (a, b) {
        return d3.ascending(a.value, b.value);
    });
   var Arr = [];
   $.each(data, function(i,d){Arr.push(d.value)})
//   console.log(Arr)
   minData =  d3.min(Arr, function (d) {
                    return d;
                });
    var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                    return d.value;
                })]);
    var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));
    var xAxis = d3.svg.axis()//we pass in the x-scale function we created earlier and give the axis an orientation of bottom.
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(0)
            .orient("left");
    var svg = d3.select("#graphic").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

    var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")
    //append rects
    bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
//                    .attr("width",0)
            .attr("rx",4).attr("ry",4)
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });
//add a value label to the right of each bar
    bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d,i) {
//                console.log(minData)
//                if()
                return x()+2;
            })
            .text(function (d) {
                return d.value;
            });
    svg.append("g")//First the code appends an SVG Group Element to hold the x-axis.Then the group element is given the class of "x axis"
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (height-margin.bottom +5) + ")")
            .call(xAxis);
});
