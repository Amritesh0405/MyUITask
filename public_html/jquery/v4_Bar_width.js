$(document).ready(function () {
// set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
var barSize = 50;

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

// get the data
//   var data = [{
//            "salesperson": "Apples",
//            "sales": 20
//        }]
    var data = [{
            "salesperson": "Apples",
            "sales": 20
        },
        {
            "salesperson": "Bananas",
            "sales": 12
        },
        {
            "salesperson": "Grapes",
            "sales": 19
        },
        {
            "salesperson": "Lemons",
            "sales": 5
        },
        {
            "salesperson": "Limes",
            "sales": 16
        },
        {
            "salesperson": "Oranges",
            "sales": 26
        },
        {
            "salesperson": "Pears",
            "sales": 30
        }];
// set the ranges
    var x = d3.scaleBand()
            .range([0, barSize*data.length])
            .padding(0.1);
    var y = d3.scaleLinear()
            .range([height, 0]);

    // format the data
    data.forEach(function (d) {
        d.sales = +d.sales;
    });

    // Scale the range of the data in the domains
    x.domain(data.map(function (d) {
        return d.salesperson;
    }));
    y.domain([0, d3.max(data, function (d) {
            return d.sales;
        })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d, i) {
                if (data.length == 1) {
                    var val = x(d.salesperson) + (parseFloat(x.bandwidth() / 3));
                    return val;
                } else {
                    return x(d.salesperson);
                }
            })
            .attr("width", function () {
                if (data.length == 1) {
                    return parseFloat(x.bandwidth() / 3)
                } else {
                    return parseFloat(x.bandwidth());
                }
            })

            .attr("y", function (d) {
                return y(d.sales);
            })
            .attr("height", function (d) {
                return height - y(d.sales);
            })
            .style("fill", "steelBlue");

    // add the x Axis
    svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
            .call(d3.axisLeft(y));

});