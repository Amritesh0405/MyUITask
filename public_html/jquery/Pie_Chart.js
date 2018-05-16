$(document).ready(function () {
    var w = 960, //width
            h = 500, //height
            r = Math.min(w, h) / 2;   //radius
    var color = d3.scale.ordinal()
            .range(["#98abc5", "#8a89a6", "#7b6888"]);    //builtin range of colors use this code color = d3.scale.category20c(); 
    data = [{"label": "one", "value": 20},
        {"label": "two", "value": 50},
        {"label": "three", "value": 30}];
    var svg = d3.select("body")
            .append("svg")     //create the SVG element inside the <body>
            .data([data])       //associate our data with the document
            .attr("width", w)    //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
            .attr("height", h)
            .append("g")         //make a group to hold our pie chart
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");
    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
            .outerRadius(r)
            .innerRadius(0);
    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
            .value(function (d) {
                return d.value;
            });    //we must tell it out to access the value of each element in our data array
    var g = svg.selectAll(".arc")    //this selects all <g> elements with class arc (there aren't any yet)
            .data(pie(data))      //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
            .enter()               //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("g")            //create a group to hold each arc (we will have a <path> and a <text> element associated with each arc)
            .attr("class", "arc");
    g.append("path")
            .attr("d", arc)             //this creates the actual SVG path using the associated data (pie) with the arc drawing function
            .style("fill", function (d) {
                return color(d.data.label);
            });
             g.append("text")             //add a label to each arc slice
                        .attr("transform", function (d) {
                            return "translate(" + arc.centroid(d) + ")"; //this gives us a pair of coordinates like [50, 50]
                        })
                        .attr("dy", ".35em")
                        .style("text-anchor", "middle")  //center the text on it's origin
                        .text(function(d,i) { return data[i].label; })
            });









