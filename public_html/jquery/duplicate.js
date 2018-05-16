$(document).ready(function () {
var tooltip = d3.select(".tooltip");
    var $container = $('.chart-container'),
        τ = 2 * Math.PI,
        width = $container.width(),
        height = $container.height(),
        innerRadius = Math.min(width,height)/4,
        //innerRadius = (outerRadius/4)*3,
        fontSize = (Math.min(width,height)/4);

var dataset = {
GE: [{"name":"M","count":600},{"name":"F","count":550}],
FG: [{"name":"AD","count":100},{"name":"AST","count":150},{"name":"ASTSC","count":180}],
DG: [{"name":"RTD","count":100},{"name":"DEVCO","count":300},{"name":"ENTR","count":20},{"name":"FPI","count":5}]
};

var dataset2 = {
GE: [{"name":"M","count":300},{"name":"F","count":400}],
FG: [{"name":"AD","count":400},{"name":"AST","count":100},{"name":"ASTSC","count":80}],
DG: [{"name":"RTD","count":100}]
};

    
var seriesNames = ["Gender","Function Group","DG"];

/*
var color = d3.scale.ordinal()    .range(["#E2A7F9","#D4A6F7","#C5A4F5","#B7A2F3","#A9A1F0","#9FA3EE","#9DADEC","#9CB7EA","#9AC1E7","#98CBE5","#97D5E3","#95DEE0","#93DED5","#92DCC7","#90DABA","#8ED7AD","#8DD5A0","#8BD393","#8CD089","#95CE88","#9ECC86","#A7CA84","#B0C783","#B8C581","#C0C380","#C0B97E","#BEAC7C","#BCA07B","#BA9479","#B78977","#B57D76","#B37476","#B0737E","#AE7186","#AC6F8D","#AA6E95","#A76C9C","#A56BA3","#9C69A3","#9167A0"]);
*/

var color = d3.scale.category20();

var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

var arc = d3.svg.arc();

var svg = d3.select('.chart-container').append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
        .attr('preserveAspectRatio','xMinYMin')
        .append("g")
        .attr("transform", "translate(" +  width / 2 + "," + height / 2 + ")")
	    .attr("class", "labels");

var gs = svg.selectAll("g")
        .data(d3.values(dataset))
        .enter()
        .append("g")
        .attr("class", "arc");
        
    
var path = gs.selectAll("path")
    .data(function(d) { return pie(d); })
    .enter().append("path")
    .attr("fill", function(d, i) { return color(i); })
    .attr("d", function(d, i, j)
          { console.log("d",j,i)
              
          return arc.innerRadius(innerRadius+(40*j)).outerRadius(innerRadius+40+(40*j))(d); })
.on("mousemove", function(d,i,j){ 
    tooltip.style("left", d3.event.pageX+10+"px");
     tooltip.style("top", d3.event.pageY-25+"px");
     tooltip.style("display", "inline-block");
    tooltip.select("span").text(seriesNames[j]+": " +d.data.name+" " +d.value);
}).on("mouseout",function(){
    tooltip.style("display","none");
}).on("click",function(d,j){
    alert("regenerate chart tween event, aparam:"+d.data.name);
});
});
