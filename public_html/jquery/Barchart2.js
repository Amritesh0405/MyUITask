$(document).ready(function () {
    var margin = {top: 20, right: 20, bottom: 30, left: 40}, //It specifies what margins the Inner Drawing Space will have, in order to separate it from the overall SVG Container.
            width = 1000 - margin.left - margin.right, //Then the width and height for the Inner Drawing Space are defined in terms of the margins and the overall width and height of the SVG Container.
            height = 500 - margin.top - margin.bottom;
    //    Get the data
    var data = [{
            SUB: 'HINDI',
            MARKS: 80
        }, {
            SUB: 'ENGLISH',
            MARKS: 60
        }, {
            SUB: 'SOCIAL STUDIES',
            MARKS: 70
        }, {
            SUB: 'SCIENCE',
            MARKS: 90
        }, {
            SUB: 'MATHS',
            MARKS: 50
        }, {
            SUB: 'HISTORY',
            MARKS: 60
        }, {
            SUB: 'GEOGRAPHY',
            MARKS: 70
        }, {
            SUB: 'CIVICS',
            MARKS: 80
        }, {
            SUB: 'GEOLOGY',
            MARKS: 30
        }, {
            SUB: 'BIOLOGY',
            MARKS: 60
        }, {
            SUB: 'HOME SCIENCE',
            MARKS: 90
        }, {
            SUB: 'ENVIRONMENTAL STUDY',
            MARKS: 70
        }, {
            SUB: 'LOGICAL ABILITY',
            MARKS: 90
        }, {
            SUB: 'APTITUDE',
            MARKS: 60
        }, {
            SUB: 'REASONING',
            MARKS: 80
        }, {
            SUB: 'BASIC CIVIL',
            MARKS: 60
        }, {
            SUB: 'BASIC MECHANICAL',
            MARKS: 50
        }, {
            SUB: 'NETWORKING',
            MARKS: 40
        }];
    var color = ['orange','bvarlue','red','green','black','pink'];
    var x = d3.scale.ordinal()// ordinal scale function for the x-axis data.
            .rangeRoundBands([0, width], .5);
    var y = d3.scale.linear()//linear scale function for the y-axis data.
            .range([height, 0]);
    var xAxis = d3.svg.axis()//we pass in the x-scale function we created earlier and give the axis an orientation of bottom.
            .scale(x)
            .orient("bottom")
            .ticks(3);
    var yAxis = d3.svg.axis()//We pass in the y-scale function we created earlier and give the axis an orientation of left.
            .scale(y)
            .orient("left");
    var svg = d3.select("body").append("svg")//code creates the SVG Container and the Inner Drawing Space
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(data.map(function (d) {
        return d.SUB;
    }));//we set the domain for the x scale function
    y.domain([0, d3.max(data, function (d) {
            return d.MARKS;
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
            .text("MARKS");
    svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.SUB);
            })
            .attr("width", x.rangeBand())
            .attr("y", function (d) {
                return y(d.MARKS);
            })
            .attr("height", function (d) {
                return height - y(d.MARKS);
            })
            .attr("fill", function (d,i) {
                return color[i]; 
            });
});    