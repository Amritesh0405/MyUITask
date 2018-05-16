var textdimension = getTextDimensions("12", "cursive", d.name);
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