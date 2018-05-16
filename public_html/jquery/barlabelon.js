 $(document).ready(function () {
     // set the dimensions and margins of the graph
     var margin = {top: 5, right: 20, bottom: 50, left: 40},
         width = $("#volume-chart-container").width() - margin.left - margin.right,
         height = 282 - margin.top - margin.bottom;
     
      var data = [
        {sales: 33, salesperson: "Bob"},
        {sales: 12, salesperson: "Robin"},
        {sales: 10, salesperson: "Anne"},
        {sales: 20, salesperson: "d"},
        {sales: 33, salesperson: "Bb"},
        {sales: 12, salesperson: "Roin"},
        {sales: 10, salesperson: "Ane"},
        {sales: 30, salesperson: "Mark"},
        {sales: 33, salesperson: "Bog"},
        {sales: 12, salesperson: "Ron"},
        {sales: 10, salesperson: "Ae"},
        {sales: 20, salesperson: "dw"},
        {sales: 33, salesperson: "Bbd"},
        {sales: 12, salesperson: "Roivn"},
        {sales: 10, salesperson: "Anekkk"},
        {sales: 30, salesperson: "Mr23"},
        {sales: 30, salesperson: "Mr4"},
        {sales: 30, salesperson: "Mr4"},
        {sales: 30, salesperson: "Mr5"},
        {sales: 30, salesperson: "Mr6"},
        {sales: 30, salesperson: "Mr7"},
        {sales: 30, salesperson: "Mr8"},
        {sales: 30, salesperson: "Mr9"},
        {sales: 30, salesperson: "Mr91"},
        {sales: 30, salesperson: "Mr92"},
        {sales: 30, salesperson: "Mr93"}
        
      ];
     // set the ranges
      var x = d3.scaleBand()
                .domain(data.map(function(d) { return d.salesperson; }))
                .range([0, width])
                .padding(0.1);
     var y = d3.scaleLinear()
               .range([height, 0]);
      var div = d3.select("body").append("div").attr("class", "toolTip");         
     // append the svg object to the body of the page
     // append a 'group' element to 'svg'
     // moves the 'group' element to the top left margin
     var svg = d3.select("#volume-chart-container").append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
       .append("g")
         .attr("transform", 
               "translate(" + margin.left + "," + margin.top + ")");

   // create title
//    svg.append("text")
//         .attr("x", (width / 2))             
//         .attr("y", 8 - (margin.top / 3))
//         .attr("text-anchor", "middle")  
//         .style("font-size", "16px") 
//         .style("fill", "#1B2735")
//         .text("Volume chart");
    
//       // format the data
//       data.forEach(function(d) {
//         d.sales = +d.sales;
//       });
    

       // Scale the range of the data in the domains
//      var newXscale = x.domain(data.map(function(d) { return d.salesperson; }));
       y.domain([0, d3.max(data, function(d) { return d.sales; })]);

       // append the rectangles for the bar chart
      var bar = svg.selectAll(".bar")
           .data(data)
         .enter().append("rect")
           .attr("class", "bar")
           .attr("x", function(d) { return x(d.salesperson); })
           .attr("width", x.bandwidth())
           .attr("y", function(d) { return y(d.sales); })
           .attr("height", function(d) { return height - y(d.sales); })
           .style("fill", "#3bc6b1");

       // add the x Axis
       svg.append("g")
       .attr("class", "x_axis")
           .attr("transform", "translate(0," + height + ")")
           .call(d3.axisBottom(x).tickValues(x.domain().filter(function(d,i){ console.log(i,(i%(data.length/10))); return !(i% (Math.ceil(data.length/10)))})))
            .selectAll("text")	
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
          
       // add the y Axis
       svg.append("g")
           .call(d3.axisLeft(y));
//           .attr("class", "y_axis");
//                console.log("fff1");

     // append labels on bars
//        svg.selectAll("text.bar")
//     .data(data)
//     .enter().append("text")
//     .attr("class", "bar")
//     .text(function(d) {
//  return d.salesperson; })
////       .attr('transform', 'rotate(90)')
//     .attr("y", function(d) { 
////         console.log("fff2",d.sales );
//         return y(d.sales) +50; })
//     .attr("x", function(d) {
////         console.log("fff3",d.salesperson );
//                 return x(d.salesperson) +100; })
//     
//     .style("fill", "#1B2735");
//     Tooltips onto Bar on mousemove and off on mouseout
      bar.on("mousemove", function (d) {
            div.style("left", d3.event.pageX + 10 + "px");
            div.style("top", d3.event.pageY - 25 + "px");
            div.style("display", "inline-block");
            div.html((d.salesperson) + " " + (d.sales));
        });

        bar.on("mouseout", function (d) {
            div.style("display", "none");
        });
       
/*function dropCatagoryAxisLabels(data, width) {
    var lable_width = 11;
    var current_position;
    var newArray = [];
    for (var i =0;i < (data.length);i++) {
        /*Include top most value */
        /*if (i == 0) {
            newArray.push(data[i]);
            current_position = newXscale(data[i]);
        } else {
            /*check for the position*/
            /*if (newXscale(data[i]) > current_position + lable_width) {
                newArray.push(data[i]);
                current_position = newXscale(data[i]);
            }
        }
    }
    return newArray;
}*/
    });
    