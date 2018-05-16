$(document).ready(function () {
    var w = $("#graph").innerWidth();
    var h = $("#graph").innerHeight();

//  var default_node_color = "#ccc";
    var color = d3.scale.category20();
    var default_link_color = "red";
    var nominal_base_node_size = 8;
    var nominal_text_size = 10;
    var max_text_size = 24;
    var nominal_stroke = 1.5;
    var highlight_stroke_width = 4;
    var max_stroke = 4.5;
    var min_zoom = 0.1;
    var max_zoom = 7;
    var svg = d3.select("#graph").append("svg");
    var zoom = d3.behavior.zoom().scaleExtent([min_zoom, max_zoom])
    var g = svg.append("g");
    svg.style("cursor", "move");

    var dNodes = [];
    var dLinks = [];


    function findNode(id) {
        for (var i in dNodes) {
            if (dNodes[i].id === id)
                return dNodes[i];
        }
    }

    function addNode(currid, name) {
        //var newNode = findNode(id);
        //if (newNode == undefined) {
        dNodes.push({
            "id": currentId,
            "name": changeName
        });

        console.log('dNodes pp', dNodes)
        currentId++;
        changeName = "name_" + (currentId)
        // }

    }

    function addLink(sourceId, targetId) {
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);
        if ((sourceNode !== undefined) && (targetNode !== undefined)) {
            dLinks.push({
                "source": sourceNode,
                "target": targetNode
            });

        }
    }
    var currentId = 1;
    var changeName = "name_" + (currentId);
    $("#btnadd").click(function () {
        var tempId = currentId;
        addNode(currentId, changeName);


        addLink(tempId, --tempId);

        update(dNodes, dLinks);
        force.start();
    });

    var force = d3.layout.force()
            .linkDistance(160)
            .charge(-300)
            .friction(0.5)
            .size([w, h]);

    var nodes = force.nodes(dNodes);
    var links = force.links(dLinks);

    force.start();

    function update(dNodes, dLinks) {
        g.selectAll(".link").remove(); //removing all link and nodes and text
        g.selectAll(".node").remove();
        g.selectAll("text").remove();

//        function isConnected(sourceNodeid, destNodeid) {
//
//            for (var i in dLinks) {
//                if ((dLinks[i].source.id == sourceNodeid && dLinks[i].target.id == destNodeid) || ((dLinks[i].source.id == destNodeid && dLinks[i].target.id == sourceNodeid))) {
//                    return true;
//                }
//
//            }
//            if (sourceNodeid == destNodeid) {
//                return true;
//            }
//            return false;
//        }




        function dragstart(d, i) {
            force.stop();
        }

        function dragmove(d, i) {
            d.px += d3.event.dx;
            d.py += d3.event.dy;
            d.x += d3.event.dx;
            d.y += d3.event.dy;
            tick();
        }

        function dragend(d, i) {
            d.fixed = true;
            tick();
        }
        var node_drag = d3.behavior.drag()
                .on("dragstart", dragstart)
                .on("drag", dragmove)
                .on("dragend", dragend);



        var link = g.selectAll(".link")
                .data(dLinks)
                .enter().append("line")
                .attr("class", "link")
                .attr("marker-end", "url(#end)")
                .style("stroke-width", nominal_stroke)
                .style("stroke", default_link_color);

        var node = g.selectAll(".node")
                .data(dNodes)
                .enter().append("g")
                .attr("class", "node")

                .call(node_drag);

        var circle = node.append("circle")
                .attr("class", "circle")
                .attr("r", function (d) {
                    d.radius = 10;
                    return d.radius
                })
                .attr("id", function (d) {
                    return d.id;
                })
                .style("fill", function (d) {
                    console.log("d",d)
                    return color(d.id);
                })

        svg.append("svg:defs").selectAll("marker")
                .data(["end"]) // Different link/path types can be defined here
                .enter().append("svg:marker") // This section adds in the arrows
                .attr("id", function (d) {
                    return d;
                })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 21)
                .attr("refY", 0)
                .attr("markerWidth", 9)
                .attr("markerHeight", 5)
                .attr("orient", "auto")
                .attr("class", "arrow")
                .append("svg:path")
                .attr("d", "M0,-5L10,0L0,5")
                .style("fill", "red");


        var text = g.selectAll(".text")
                .data(dNodes)
                .enter().append("text")
                .attr("dy", ".35em")
                .attr("y", "22")
                .style("font-size", nominal_text_size + "px")
        text.text(function (d) {
            return d.name;
        })
                .style("text-anchor", "middle");


        zoom.on("zoom", function () {
            var stroke = nominal_stroke;
            if (nominal_stroke * zoom.scale() > max_stroke)
                stroke = max_stroke / zoom.scale();
            link.style("stroke-width", stroke);
            circle.style("stroke-width", stroke);

            var text_size = nominal_text_size;
            if (nominal_text_size * zoom.scale() > max_text_size)
                text_size = max_text_size / zoom.scale();
            text.style("font-size", text_size + "px");
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        });
        svg.call(zoom);
        resize();
        force.on("tick", tick);

        function tick() {
            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
            text.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

            link.attr("x1", function (d) {
                return d.source.x;
            })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });

            //node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });	
            node.attr("cx", function (d) {
                return d.x;
            })
                    .attr("cy", function (d) {
                        return d.y;
                    });

        }



        function resize() {
            var width = $("#graph").innerWidth();

            var height = $("#graph").innerHeight();
            svg.attr("width", width).attr("height", height);

            force.size([force.size()[0] + (width - w) / zoom.scale(), force.size()[1] + (height - h) / zoom.scale()]).resume();
            w = width;
            h = height;
        }
    }
});