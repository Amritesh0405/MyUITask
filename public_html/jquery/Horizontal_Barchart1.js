 $(document).ready(function () {
 var data = [{
 "name": "Malaysia",
 "count": 8,
 "longitude": 1.352083,
 "latitude": 103.819836
}, {
 "name": "US",
 "count": 4,
 "longitude": 1.352083,
 "latitude": 103.819836
}, {
 "name": "Singapore",
 "count": 5,
 "longitude": 1.352083,
 "latitude": 103.819836
}];
    data.forEach(function(d) {
      d.count = +d.count;
    });
  // set the dimensions and margins of the graph
   var margin = {top: 5, right: 5, bottom: 50, left: 5},
       width = 960 - margin.left - margin.right,
       height = 282 - margin.top - margin.bottom;
   // set the ranges
   var y = d3.scaleBand()
             .range([height, 0])
             .padding(0.5);

   var x = d3.scaleLinear()
             .range([0, width]);
             
   // append the svg object to the body of the page
   // append a 'group' element to 'svg'
   // moves the 'group' element to the top left margin
   var svg = d3.select("#graphic").append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", 
             "translate(" + margin.left + "," + margin.top + ")");
   
    // create title
//    svg.append("text")
//         .attr("x", (width / 2))             
//         .attr("y", 10 - (margin.top / 3))
//         .attr("text-anchor", "middle")  
//         .style("font-size", "16px") 
//         .style("fill", "#1B2735")
//         .text(titleText);

     // Scale the range of the data in the domains
     x.domain([0, d3.max(data, function(d){ return d.count; })])
     y.domain(data.map(function(d) { return d.name; }));

     // append the rectangles for the bar chart
    var bar = svg.selectAll(".bar")
         .data(data)
       .enter().append("rect")
         .attr("class", "bar")
         .attr("width",0)
         .attr("y", function(d) { return y(d.name); })
         .attr("height", y.bandwidth())
         .style("fill", "#3bc6b1");
          bar.transition().duration(500).attr("width", function (d) {
	            return x(d.count);
	        })
     // add the x Axis
     svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).ticks(5));

     // add the y Axis
     svg.append("g")
         .call(d3.axisLeft(y))
         .attr("class", "y_axis");
     
     // append labels on bars
    svg.selectAll("text.bar")
      .data(data)
      .enter().append("text")
      .attr("class", "bar")
      .attr("y", function(d) { return  (y(d.name)+(y.bandwidth()/2))+((getTextDimensions("12", "cursive", d.name).height)/2) })
      .attr("x", function (d) {
                return x(d.count)})
      .text(function(d) {
//           var textdimension = getTextDimensions("12", "cursive", d.name);
          getTextDimensions("12", "cursive", d.name);
          return (d.name);})
      .style("fill", "#1B2735")
//      .attr("text-anchor", "middle")
//      .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '3px'});

 });
// var textdimension = getTextDimensions("12", "cursive", d.name);
/* 
 * Function used to give the dimensions to the text
 */
function getTextDimensions(fontsize, fontfamily, text) {
    var svgTemp = d3.select("body")
            .append("svg:svg")
            .style("opacity", 0)
            .attr('id', 'svgTemp');
    var textTemp = svgTemp.append("svg:text")
            .attr("x", -500)
            .attr("y", 20)
            .style("font-size", fontsize + "px")
            .style("font-family", fontfamily)
            .text(text);
    var textDimensions = textTemp.node().getBBox();
    $('#svgTemp').remove();
    console.log("textDimensions",textDimensions);
    return textDimensions;
    
}