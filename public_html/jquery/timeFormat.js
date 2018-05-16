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

    var parseTime = d3.timeParse("%s");
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Get the data
    var data = [{
            date: "1498193100",
            close: "58.13"
        }, {
            date: "1498193400",
            close: "53.98"
        }, {
            date: "1498193700",
            close: "67.00"
        }, 
        {
            date: "1498194000",
            close: "89.70"
        }, {
            date: "1498194300",
            close: "99.00"
        }];
var formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

function multiFormat(date) {
  return (d3.timeSecond(date) < date ? formatMillisecond
      : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
      : d3.timeDay(date) < date ? formatHour
      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
      : d3.timeYear(date) < date ? formatMonth
      : formatYear)(date);
}

// Scale the range of the data
    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });
  console.log(data)
 var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });
  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5).tickFormat(function(d){
          console.log(d);
          return multiFormat(d);
      }));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});