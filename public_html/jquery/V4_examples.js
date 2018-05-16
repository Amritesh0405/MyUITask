$(document).ready(function(){
    var whiteblue = d3.interpolateRgb("#eee", "steelblue"),
    blueorange = d3.interpolateRgb("steelblue", "orange"),
    orangewhite = d3.interpolateRgb("orange", "#eee");
d3.select("body").selectAll("div")
    .data(d3.range(1,12))
  .enter().append("div")
  .transition()
    .delay(function(d, i) { return i + Math.random() * 12 / 4; })
    .ease(d3.easeLinear)
    .on("start", function repeat() {
        d3.active(this)
            .styleTween("background-color", function() { return whiteblue; })
          .transition()
            .delay(1000)
            .styleTween("background-color", function() { return blueorange; })
          .transition()
            .delay(1000)
            .styleTween("background-color", function() { return orangewhite; })
          .transition()
            .delay(1000)
            .on("start", repeat);
      });
});
