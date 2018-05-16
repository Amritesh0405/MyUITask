$(document).ready(function () {
    var margin = {top: 20, right: 20, bottom: 30, left: 40}, //It specifies what margins the Inner Drawing Space will have, in order to separate it from the overall SVG Container.
            width = 1000 - margin.left - margin.right, //Then the width and height for the Inner Drawing Space are defined in terms of the margins and the overall width and height of the SVG Container.
            height = 500 - margin.top - margin.bottom;
    //    Get the data
    var data = [{
            letter: 'A',
            frequency: .08167,
            color: 'red'
        }, {
            letter: 'B',
            frequency: .01492,
            color: 'blue'
        }, {
            letter: 'C',
            frequency: .02780,
            color: 'green'
        }, {
            letter: 'D',
            frequency: .04253,
            color: 'black'
        }, {
            letter: 'E',
            frequency: .12702,
            color: 'blue'
        }, {
            letter: 'F',
            frequency: .02288,
            color: 'black'
        }, {
            letter: 'G',
            frequency: .02022,
            color: 'red'
        }, {
            letter: 'H',
            frequency: .06894,
            color: 'green'
        }, {
            letter: 'I',
            frequency: .06973,
            color: 'blue'
        }, {
            letter: 'J',
            frequency: .00153,
            color: 'blue'
        }, {
            letter: 'K',
            frequency: .00747,
            color: 'blue'
        }, {
            letter: 'L',
            frequency: .04825,
            color: 'blue'
        }, {
            letter: 'M',
            frequency: .02517,
            color: 'black'
        }, {
            letter:'N',
            frequency: .06749,
            color: 'green'
        }, {
            letter: 'O',
            frequency: .07507,
            color: 'black'
        }, {
            letter: 'P',
            frequency: .01920,
            color: 'red'
        }, {
            letter: 'Q',
            frequency: .00898,
            color: 'blue'
        }, {
            letter: 'R',
            frequency: .05987,
            color: 'red'
        }, {
            letter: 'S',
            frequency: .06333,
            color: 'black'
        }, {
            letter: 'T',
            frequency: .09056,
            color: 'green'
        }, {
            letter: 'U',
            frequency: .02758,
            color: 'red'
        }, {
            letter: 'V',
            frequency: .01037,
            color: 'black'
        }, {
            letter: 'W',
            frequency: .02465,
            color: 'green'
        }, {
            letter: 'X',
            frequency: .00150,
            color: 'red'
        }, {
            letter: 'Y',
            frequency: .01971,
            color: 'black'
        }, {
            letter: 'Z',
            frequency: .00074,
            color: 'blue'
        }];
    var formatPercent = d3.format(".0%");//This particular code converts a number to a decimal percentage format.So 0 point 1 1 gets converted to 11 percentage sign.
    var x = d3.scale.ordinal()// ordinal scale function for the x-axis data.
            .rangeRoundBands([0, width], .1);
    var y = d3.scale.linear()//linear scale function for the y-axis data.
            .range([height, 0]);
    var xAxis = d3.svg.axis()//we pass in the x-scale function we created earlier and give the axis an orientation of bottom.
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()//We pass in the y-scale function we created earlier and give the axis an orientation of left.
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);//The dot tickformat() functionality sets or gets the value formatter for labels of the D3 axis component.
    var svg = d3.select("body").append("svg")//code creates the SVG Container and the Inner Drawing Space
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    data.forEach(function (d) {
        d.frequency = +d.frequency;//This is a quick way to convert a string to a number in JavaScript.The + sign in front of the d dot frequency converts the string to a number.
    });
    x.domain(data.map(function (d) {
        return d.letter;
    }));//we set the domain for the x scale function
    y.domain([0, d3.max(data, function (d) {
            return d.frequency;
        })]);//we set the domain for the x scale function.
    svg.append("g")//First the code appends an SVG Group Element to hold the x-axis.Then the group element is given the class of "x axis"
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
             .attr("fill", function (d) {
                return  d.color;
    });
});     
