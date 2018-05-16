$(document).ready(function () {
    var option = {
        container: "#example",
        marginTop: 20,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 40,
        height: $("#example").height(),
    }
    function lineChartWithOrdinal(options) {
        $(options.container).empty();
        if (options)
        {
            options.container = options.container ? options.container : "body"
            options.width = options.width ? options.width : $(options.container).width() 
            options.height = options.height ? options.height : 300
            options.marginTop = options.marginTop ? options.marginTop : 30
            options.marginBottom = options.marginBottom ? options.marginBottom : 30
            options.marginRight = options.marginRight ? options.marginRight : 20
            options.marginLeft = options.marginLeft ? options.marginLeft : 50
            options.xParam = options.xParam ? options.xParam : $('#errormsg').html('Please check ... May be Data,x-Parameter or y-Parameter is missing.. ');
            options.yParam = options.yParam ? options.yParam : $('#errormsg').html('Please check ... May be Data,x-Parameter or y-Parameter is missing.. ');
            options.gridx = options.gridx ? options.gridx : false
            options.gridy = options.gridy ? options.gridy : false
            options.randomIdString = Math.floor(Math.random() * 10000000000);
            options.header = options.header ? options.header : "LINE CHART";
            options.headerOptions = options.headerOptions == false ? options.headerOptions : true;

        }
        var margin = {top: options.marginTop, right: options.marginRight, bottom: options.marginBottom, left: options.marginLeft},
                width = options.width - margin.left - margin.right,
                height = options.height - margin.top - margin.bottom;
        var svg = d3.select(options.container)
                .append("svg")
                .attr('height', options.height)
                .attr('width', width)
        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
                y = d3.scaleLinear().rangeRound([height, 0]);
        var g = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        var data = [{
                letter: 'A',
                frequency: .08167,

            }, {
                letter: 'B',
                frequency: .01492,

            }, {
                letter: 'C',
                frequency: .02780,

            }, {
                letter: 'D',
                frequency: .04253,

            }, {
                letter: 'E',
                frequency: .12702,

            }, {
                letter: 'F',
                frequency: .02288,

            }]
        data.forEach(function (d) {
            d.frequency = +d.frequency;//This is a quick way to convert a string to a number in JavaScript.The + sign in front of the d dot frequency converts the string to a number.
        });
        var line = d3.line()
                .x(function (d) {
                    return x(d.letter);
                })
                .y(function (d) {
                    return y(d.frequency);
                })

        x.domain(data.map(function (d) {
            return d.letter;
        }));

        y.domain([0, d3.max(data, function (d) {
                return d.frequency;
            })]);
        g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

        g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y).ticks(10, "%"))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

        g.append("path")
                .datum(data)
                .attr("class", "line")
                .attr("d", line);

        g.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("class", "circle")
                .attr("cx", function (d) {
                    return x(d.letter);
                })
                .attr("cy", function (d) {
                    return y(d.frequency);
                })
                .attr("r", 4);
    }
    lineChartWithOrdinal(option);
});

