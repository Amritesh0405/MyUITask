$(document).ready(function () {
var options = {
    container: "#forceCollapseCurved",
    "uri": "data/Test_Forcecollapse.json",
    "height": 480,
};
maninder = '';
function loadforcecollapseCurvedData(options) {
        var current_options = options;
        d3.json(options.uri, function (error, data) {
//        window.showforceLegends();
            current_options.data = formatData(data, options);
//        callback(data);
        });
    }
    loadforcecollapseCurvedData(options);
    function formatData(data, options) {
        var collapsibleNodes = [], allnonCollapsableNodes = [];
        var verticesObj = {}, finalData = [];
        $.each(data.edges, function (i, d) {
//        if ($.inArray(d.from, allnonCollapsableNodes) == -1) {
//            allnonCollapsableNodes.push(d.from);
//        }
//        if ($.inArray(d.to, allnonCollapsableNodes) == -1) {
//            allnonCollapsableNodes.push(d.to);
//        }
            if (!d.amount) {
                d.amount = 0;
            }
            if (!d.transaction_count) {
                d.transaction_count = 0;
            }
        });
        $.each(data.vertices, function (i, d) {
            d.name = d.name + "____" + (d.id.split("#").join("___").split(":").join("__"));
            if ($.inArray(d.id, allnonCollapsableNodes) == -1) {
                collapsibleNodes.push(d.id);
            }
            verticesObj[d.id] = d;
        });
        var amt_range = d3.extent(data.edges, function (d) {
            return d.amount;
        });
        var scale = d3.scaleLinear().domain(amt_range).range([1, 10]);
        finalData.links = [];
        finalData.nodes = [];
        var verticeslinks = [];
        $.each(data.edges, function (i, d) {
            verticeslinks[d.from] = d;
            verticeslinks[d.to] = d;
//	        if(verticesObj[d.from] && verticesObj[d.to])
            finalData.links.push({
                source: d.from,
                sourceArr: verticesObj[d.from] || '',
                target: d.to,
                targetArr: verticesObj[d.to] || '',
                transaction_count: d.transaction_count,
                risk: parseInt(scale(d.amount)),
                riskActual: d.amount,
                label: d.labelE,
                suspicious: d.suspicious
            });
        });
        $.each(data.vertices, function (i, d) {
            if (verticeslinks[d.id] != undefined) {
                finalData.nodes.push({
                    id: d.id,
                    name: d.name,
                    lableV: d.labelV,
                    transaction_count: verticeslinks[d.id].transaction_count,
                    risk: parseInt(scale(verticeslinks[d.id].amount)),
                    riskActual: verticeslinks[d.id].amount,
                    label: verticeslinks[d.id].label,
                    suspicious: verticeslinks[d.id].suspicious
                });
            } else {
                finalData.nodes.push({
                    id: d.id,
                    name: d.name,
                    lableV: d.labelV
                });
            }
        });
//	    finalData.nodes = data.vertices;
        console.log(finalData)
        forceCollapseCurved(finalData, options, collapsibleNodes);

    }

    function forceCollapseCurved(data, options, collapsibleNodes) {
        var links = data.links;
        if (!collapsibleNodes) {
            collapsibleNodes = [];
        }
        var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        $(".force_tooltip_curved").remove();
        var tool_tip = $('body').append('<div class="force_tooltip_curved" style="z-index:2000;position: absolute; opacity: 1; pointer-events: none; visibility: hidden;background-color:#0cae96; padding: 10px;border-radius: 5px;border: 1px solid gray;font-size: 10px;color:#000;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');
        var tool_tip1 = $('body').append('<div class="force_tooltip_curved1" style="z-index:2000;position: absolute; opacity: 1; pointer-events: none; visibility: hidden;background-color:#0cae96; padding: 10px;border-radius: 5px;border: 1px solid gray;font-size: 10px;color:#000;"><span style=" font-size: 12px; position: absolute; white-space: nowrap;  margin-left: 0px; margin-top: 0px; left: 8px; top: 8px;"><span style="font-size:10px" class="tool_tip_x_val"></span><table><tbody><tr><td style="padding:0"> </td><td style="padding:0"><b>216.4 mm</b></td></tr><tr><td style="color:#434348;padding:0">New York: </td><td style="padding:0"><b>91.2 mm</b></td></tr><tr><td style="color:#90ed7d;padding:0">London: </td><td style="padding:0"><b>52.4 mm</b></td></tr><tr><td style="color:#f7a35c;padding:0">Berlin: </td><td style="padding:0"><b>47.6 mm</b></td></tr></tbody></table></span></div>');
        var markerArr = [];
        var linksArr = [], linkslist = [];

        $.each(links, function (i, d) {
            if ($.inArray(d.source + "_" + d.target, linkslist) == -1 && (d.source != d.target)) {
                linkslist.push(d.source + "_" + d.target);
                linksArr.push(d)
                markerArr.push({risk: d.risk,
                    suspicious: d.suspicious,
                    label: d.label,
                    id: linksArr.length - 1

                });
            }

        });

        var nodes = data.nodes;
        data.nodes = nodes;
        data.links = linksArr;

        var width = $(options.container).width() ? $(options.container).width() : 960,
                height = options.height ? options.height : 500;

        /*** Configure zoom behaviour ***/
        var zoomer = d3.zoom()
                .scaleExtent([0.1, 10])
                //allow 10 times zoom in or out
                .on("zoom", zoomFn);
        //define the event handler function
        function zoomFn() {

            svg.attr("transform", d3.event.transform);
        }

        /*** Configure drag behaviour ***/
        var drag = d3.drag()
                .subject(function (d) {
                    return d;
                }) //center of circle
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);

        function dragstarted(d) {
            if (!d3.event.active)
                simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
//	        d3.event.sourceEvent.stopPropagation();
//	        d3.select(this).classed("active", true);
//	        force.stop(); //stop ticks while dragging
//	        simulation.stop();
        }
        function dragged(d) {
            if (d.fixed)
                return; //root is fixed

            //get mouse coordinates relative to the visualization
            //coordinate system:
            d.fx = d3.event.x;
            d.fy = d3.event.y;
            var mouse = d3.mouse(svg.node());
            d.x = mouse[0];
            d.y = mouse[1];
            tick();//re-position this node and any links
        }
        function dragended(d) {

            if (!d3.event.active) {
                simulation.alphaTarget(0);
            }
            //  d.fx = null;
            //d.fy = null;
//	        d3.select(this).classed("active", false);
////	        force.resume();
//	        simulation.restart();

//	            if (!d3.event.active) simulation.alphaTarget(0);
//	            d.fx = null;
//	            d.fy = null;
        }
        $(options.container).empty();

        var mainsvg = d3.select(options.container).append("svg")
                .attr("width", width)
                .attr("height", height).append("g")
                .attr("class", "graph")
                .call(zoomer); //Attach zoom behaviour.
        var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) {
                    return d.id;
                }))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 3, height / 3));

        var rect = mainsvg.append("rect")
                .attr("width", width)
                .attr("height", height).style("fill", "transparent");
        var svg = mainsvg.append("svg:g")
                .attr("class", "plotting-area")

                //.style("fill", "none") 
                //make transparent (vs black if commented-out)
                .style("pointer-events", "all");
        // Per-risk markers, as they don't inherit styles.
        svg.append("defs").selectAll("marker")
                .data(markerArr)
                .enter().append("marker")
//	            .attr("markerUnits","userSpaceOnUse")
                .attr("id", function (d) {
                    return "marker" + (d.risk) + "marker_" + d.id;
                })
                .attr("class", function (d) {
                    return "markerCls_" + d.label;
                })
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", function (d) {
                    if ((d.risk) < 5) {
                        return 20;
                    } else {
                        return 15;
                    }
                })
                .attr("refY", function (d) {

                    return -1 - ((d.risk) / 7);

                })
                .attr("markerWidth", function (d) {
                    if ((d.risk) < 5) {
                        return 10 - (2 * (d.risk));
                    } else {
                        return 2;
                    }
                })
                .attr("markerHeight", function (d) {
                    if ((d.risk) < 5) {
                        return 10 - (2 * (d.risk));
                    } else {
                        return 2;
                    }
                })
                .attr("orient", "auto")
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .style("fill", function (d) {
                    if (d.suspicious == true) {
                        return "red";
                    } else if (d.label == "tx") {
                        return "#1F77B4";
                    } else {
                        return "#9467BD";
                    }
                });
        var newLabel;
        var path = svg.append("g").attr("class", "links_g").selectAll(".link")
                .data(data.links)
                .enter().append("path")
                .attr("class", function (d) {
                    return "link " + d.risk + " linkCls_" + d.label + " linkSrcTrgt_" + d.sourceArr.labelV + "_" + d.targetArr.labelV + " link_" + d.targetArr.name.toUpperCase().replace(/ /g, '') + " link_source" + d.sourceArr.name.toUpperCase().replace(/ /g, '') + " linkst_" + d.sourceArr.name.toUpperCase().replace(/ /g, '') + d.targetArr.name.toUpperCase().replace(/ /g, '');
                })
                .attr("target", function (d) {
                    return d.targetArr.name.toUpperCase().replace(/ /g, '');
                })
                .attr("source", function (d) {
                    return d.sourceArr.name.toUpperCase().replace(/ /g, '');
                })
                .on("mouseover", function (d) {
                    newLabel = d.label.replace("customer_rel_", "");
                    if (d.label == 'tx') {
                        $(".force_tooltip_curved1").html('<span>' + d.label + '</span><br><span>Source:  ' + d.source.name.split("____")[0] + '</span><br><span>Target:' + d.target.name.split("____")[0] + ' </span><br><span>Transaction Count: ' + d.transaction_count + '</span><br><span>Amount: ' + d.riskActual.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' SGD</span>');
                    } else {
                        $(".force_tooltip_curved1").html('<span>Relation:' + (newLabel.charAt(0).toUpperCase() + newLabel.slice(1)) + '</span><br><span>Source:  ' + d.source.name.split("____")[0] + '</span><br><span>Target:' + d.target.name.split("____")[0] + ' </span>');
                    }

                    return $(".force_tooltip_curved1").css("visibility", "visible");
                }).on("mousemove", function () {
            $(".force_tooltip_curved1").css("top", (d3.event.pageY - 10) + "px")
            return  $(".force_tooltip_curved1").css("left", (d3.event.pageX + 10) + "px");

        }).
                on("mouseout", function () {
                    return $(".force_tooltip_curved1").css("visibility", "hidden");
                })
                .style("fill", "none")
                .style("stroke", function (d) {
                    if (d.suspicious == true) {
                        return "red";
                    } else if (d.label == "tx") {
                        return "#1F77B4";
                    } else {
                        return "#9467BD";
                    }
                })
                .style("stroke-width", function (d) {
                    return d.risk + 'px';
                })
                .attr("marker-end", function (d, i) {
//	            		console.log(d)

                    return "url(#" + "marker" + d.risk + "marker_" + i + ")";
                });
        var highLight, test = 0;
        var dblClicked = false;
        var circle = svg.append("g").attr("class", "circle_g").selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
                .attr("r", 10)
                .attr("id", function (d) {
                    return "circle_" + (d.id.split("#").join("___").split(":").join("__"));
                })
                .attr("class", function (d) {
                    var collapseClass = '';
                    if ($.inArray(d.id, collapsibleNodes) != -1) {
                        collapseClass = "collapsable";
                    }
                    //	            	console.log("circle......", d.name);
                    return "link " + d.risk + " circleCls_" + d.lableV + " circle_" + d.name.toUpperCase().replace(/ /g, '') + " " + collapseClass;
                })
                .on("mouseover", function (d) {
                    if (d.suspicious == true)
                        $(".force_tooltip_curved").html('<span>Name:  ' + d.name.split("____")[0] + '</span><br><span>Group: ' + (d.lableV.charAt(0).toUpperCase() + d.lableV.slice(1)) + '</span><br><span> Reason:  suspicious </span>');
                    else
                        $(".force_tooltip_curved").html('<span>Name:  ' + d.name.split("____")[0] + '</span><br><span>Group: ' + (d.lableV.charAt(0).toUpperCase() + d.lableV.slice(1)) + '</span>');

                    return $(".force_tooltip_curved").css("visibility", "visible");
                })
                .on("dblclick", function (o) {
                    dblClicked = true;
                    d3.event.stopPropagation();
                    var _this = $(this);
                    // collpaseEpand(_this, o);
                    collpaseExpandTest(_this, o);
                    setTimeout(function () {
                        dblClicked = false;
                    }, 300);
                })
                .on("click", function (o) {
                    setTimeout(function () {
                        if (dblClicked) {
                            return false;
                        }
                        if (test == 0) {
                            highLight = o.id;
                            test = 1;
                        } else {
                            if (highLight == o.id) {
                                resetConnection();
                                test = 0;
                                return;
                            } else {
                                highLight = o.id;
                            }

                        }

                        resetConnection();
                        circle.classed('activenode', function (d) {
                            if (d.id == o.id)
                            {
                                this.style.fill = "green";
                            }

                        })
                        path.classed("linactive", function (d) {
                            if (d.sourceArr.id == o.id || d.targetArr.id == o.id) {
                                this.style.stroke = "green"
                                if (d.sourceArr.id == o.id)
                                {
                                    circle.classed('activenode', function (e) {
                                        if (e.id == d.targetArr.id)
                                        {
                                            this.style.fill = "green";
                                            path.classed("linkactive", function (d) {
                                                if (d.sourceArr.id == e.id || d.targetArr.id == e.id) {
                                                    this.style.stroke = "green";
                                                    circle.classed('activenode', function (e) {
                                                        if (e.id == d.targetArr.id || e.id == d.sourceArr.id)
                                                        {
                                                            this.style.fill = "green"
                                                        }
                                                    })
                                                }
                                            })
                                        }

                                    })
                                } else {
                                    circle.classed('activenode', function (e) {
                                        if (e.id == d.sourceArr.id)
                                        {
                                            this.style.fill = "green";
                                            path.classed("linkactive", function (d) {
                                                if (d.sourceArr.id == e.id || d.targetArr.id == e.id) {
                                                    this.style.stroke = "green"
                                                    circle.classed('activenode', function (e) {
                                                        if (e.id == d.targetArr.id || e.id == d.sourceArr.id)
                                                        {
                                                            this.style.fill = "green"
                                                        }
                                                    })

                                                }
                                            })
                                        }

                                    })
                                }
                            }
                        })
                    }, 300);
                })
                .on("mousemove", function (d) {
                    $(".force_tooltip_curved").css("top", (d3.event.pageY - 10) + "px")
                    return  $(".force_tooltip_curved").css("left", (d3.event.pageX + 10) + "px");

                })
                .on("mouseout", function () {
                    return $(".force_tooltip_curved").css("visibility", "hidden");
                })
                .style("fill", function (d) {

                    if (d.lableV == "external") {
                        return "#E377C2";
                    } else if (d.lableV == "organization") {
                        return "#BCBD22";
                    } else if (d.lableV == "person") {
                        return "#17BECF";
                    } else {
                        return "#E58C18";
                    }
                })
                .style("stroke", "none")
                .call(drag);
        var text = svg.append("g").attr("class", "text_g").selectAll("text")
                .data(data.nodes)
                .enter().append("text")
                .attr("x", 8)
                .attr("y", ".31em")
                .attr("class", function (d) {
                    return "text_" + d.name.toUpperCase().replace(/ /g, '') + " textCls_" + d.lableV;
                })
                .text(function (d) {
                    return d.name.split("____")[0];
                })
                .style("font", "10px sans-serif")
                .style("font-family", "Roboto")
                .style("pointer-events", "none")
                .style(" text-shadow", " 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff");
        simulation
                .nodes(nodes)
                .on("tick", tick);

        simulation.force("link")
                .links(links);

        var mark = svg.append("g").attr("class", "mark_g").selectAll("text")
                .data(data.nodes)
                .enter().append("text")
                .attr("x", -2)
                .attr("y", ".31em")
                .attr("class", function (d) {
                    return "mark_" + d.name.toUpperCase().replace(/ /g, '') + " markCls_" + d.lableV;
                })
                .style("font-family", "Roboto")
                .text(function (d) {
                    if (d.suspicious) {
                        return '!';
                    }
                })


        var helpCirle = svg.append("g").attr("class", "help_circle").selectAll("circle").data(data.nodes).enter().append("circle")
                .attr("r", 0)
                .attr("id", function (d) {
                    return "help_circle_" + (d.id.split("#").join("___").split(":").join("__"));
                }).style("fill", function (d) {

            if (d.lableV == "external") {
                return "#E377C2";
            } else if (d.lableV == "organization") {
                return "#BCBD22";
            } else if (d.lableV == "person") {
                return "#17BECF";
            } else {
                return "#E58C18";
            }
        })
                .style("stroke", "#999999")
        var helpText = svg.append("g").attr("class", "help_text").selectAll("text").data(data.nodes).enter()
                .append("text")
                .attr("id", function (d) {
                    return "helptxt_circle_" + (d.id.split("#").join("___").split(":").join("__"));
                })
//            .style("stroke", "#272727")
                .style("fill", "rgb(39, 39, 39)")
                .text("");




        // Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
            path.attr("d", linkArc);
            circle.attr("transform", transform);
            text.attr("transform", transform);
            mark.attr("transform", transform);
            helpCirle.attr("transform", transform);
            helpText.attr("transform", transform);
        }

        function resetConnection() {
            circle.style("fill", function (d) {
                if (d.lableV == "external") {
                    return "#E377C2";
                } else if (d.lableV == "organization") {
                    return "#BCBD22";
                } else if (d.lableV == "person") {
                    return "#17BECF";
                } else {
                    return "#E58C18";
                }
            });
            path.style("stroke", function (d) {
                if (d.suspicious == true) {
                    return "red";
                } else if (d.label == "tx") {
                    return "#1F77B4";
                } else {
                    return "#9467BD";
                }
            })
        }

        function linkArc(d) {
            //console.log(d)
            var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        }

        function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        function collpaseExpandTest(_this, o) {

            var clickedNode = (o.name).toUpperCase().replace(/ /g, '');
            var sourceId = $(_this).attr("id");
            var collapseCount = 0 ;
            if(svg.select("#helptxt_" + sourceId).attr('val') != null && svg.select("#helptxt_" + sourceId).style('display') == "block"){
            	collapseCount = parseInt(svg.select("#helptxt_" + sourceId).attr('val'));
            }
            else{
            	collapseCount = 0;
            }
            var relatedNode = [];
            var sources = [];
            var targets = [];
            var nodeToHide = [];
            var reatedTargetNodes = [];
            var realtedSourceNode = [];
            $(".link").each(function () {
                var source = $(this).attr('source');
                var target = $(this).attr('target')
                sources.push(source);
                targets.push(target)
                if (source == clickedNode) {
                    relatedNode.push(target);
                    reatedTargetNodes.push(target);
                }
                if (target == clickedNode) {
                    relatedNode.push(source);
                    realtedSourceNode.push(source);
                }

            });
            console.log(relatedNode);
            $(relatedNode).each(function (i, node) {

                if ($(".circle_" + node).hasClass("collapsed")) {
                    nodeToHide.push(node)
                } else {
//            console.log(i, node);
                    var numOccurencesSource = $.grep(sources, function (elem) {
                        return elem === node;
                    }).length;

                    var numOccurencesTarget = $.grep(targets, function (elem) {
                        return elem === node;
                    }).length;

                    var totalOccurence = numOccurencesSource + numOccurencesTarget
                    if (totalOccurence == 1) {
                        nodeToHide.push(node);
                    }
                }
                //  console.log(node, numOccurencesSource, numOccurencesTarget)
            })


            // var collapseCount = nodeToHide.length;
            
            var hiddenNodes = [];
//        var hideClass = false, showClass = false;
            $(nodeToHide).each(function (i, node) {
                var target_id = $(".circle_" + node).attr("id");
                if (d3.select("#" + target_id).classed("hideClass")) {
                    // Remove item 'seven' from array
                    hiddenNodes.push(node);
                }
            });

            if ((diffArray(nodeToHide, hiddenNodes)).length !== 0) {
                nodeToHide = diffArray(nodeToHide, hiddenNodes);
            }
            console.log(nodeToHide);
            var count = 0, showMainNode;
            $(nodeToHide).each(function (i, node) {
                var source, target, effectedNode, mainNode, mainNodeId;
//              console.log("nodeToHide----------", o.name);
                if ($.inArray(node, reatedTargetNodes) === -1) {
                    source = node;
                    target = (o.name).toUpperCase().replace(/ /g, '');

                } else {
                    source = (o.name).toUpperCase().replace(/ /g, '');
                    target = node;
                }
                effectedNode = node;
                mainNode = (o.name).toUpperCase().replace(/ /g, '');
                mainNodeId = $(".circle_" + mainNode).attr("id");
//                  var target = node;
                var target_id = $(".circle_" + node).attr("id");
                if (d3.select("#" + target_id).classed("collapsable")) {
                    if (d3.select("#" + target_id).classed("hideClass")) {
                    	collapseCount = 0;
                        if (svg.select("#helptxt_" + target_id).attr('val')) {
                            svg.select(".help_circle").select("#help_" + target_id).attr("r", 7);
                            svg.select(".help_text").select("#helptxt_" + target_id).style("display", "");
                        }
                        if (svg.select(".help_text").select("#helptxt_" + mainNodeId).text()){
                        	collapseCount = 0;
                            svg.select(".help_circle").select("#help_" + mainNodeId).attr("r", 0);
	                        svg.select(".help_text").select("#helptxt_" + mainNodeId).style("display", "none");
	                        d3.select("#" + mainNodeId).classed("collapsed", false);
                        }
                        d3.select(".circle_" + effectedNode).classed("showClass", true);
                        d3.select(".mark_" + effectedNode).classed("showClass", true);
                        d3.select(".text" + effectedNode).classed("showClass", true);
                        d3.select(".linkst_" + source + target).classed("showClass", true);
                        d3.select(".circle_" + effectedNode).classed("hideClass", false);
                        d3.select(".mark_" + effectedNode).classed("hideClass", false);
                        d3.select(".text_" + effectedNode).classed("hideClass", false);
                        d3.select(".linkst_" + source + target).classed("hideClass", false);
                    } else {
                    	if (svg.select("#helptxt_" + target_id).attr('val')) {
	                        collapseCount = collapseCount + parseInt(svg.select("#helptxt_" + target_id).attr('val')) + 1;
	                        svg.select(".help_circle").select("#help_" + target_id).attr("r", 0);
	                        svg.select(".help_text").select("#helptxt_" + target_id).style("display", "none");
                       }
                       else {
                        	 collapseCount++;//to check whether to add collapse class to the current node or not
                        }
                        svg.select(".help_circle").select("#help_" + mainNodeId).attr("r", 7);
                        svg.select(".help_text").select("#helptxt_" + mainNodeId).style("display", "");
                        d3.select(".circle_" + effectedNode).classed("hideClass", true);
                        d3.select(".mark_" + effectedNode).classed("hideClass", true);
                        d3.select(".text_" + effectedNode).classed("hideClass", true);
                        d3.select(".linkst_" + source + target).classed("hideClass", true);
                        d3.select(".circle_" + effectedNode).classed("showClass", false);
                        d3.select(".mark_" + effectedNode).classed("showClass", false);
                        d3.select(".text_" + effectedNode).classed("showClass", false);
                        d3.select(".linkst_" + source + target).classed("showClass", false);
                    }
                }
            }
            )
            if (collapseCount == relatedNode.length - 1 && collapseCount != 0) {
                d3.select("#" + sourceId).classed("collapsable", true);
                d3.select("#" + sourceId).classed("collapsed", true);
            } else {
                d3.select("#" + sourceId).classed("collapsable", false);
                d3.select("#" + sourceId).classed("collapsed", false);
            }

            if (collapseCount > 0) {
                var fill = d3.select("#" + sourceId).attr("fill");
                d3.select("#" + sourceId).attr("r", 12);
                svg.select(".help_circle").select("#help_" + sourceId)
                        .attr('cx', 8).attr("cy", -8)
                        .attr("r", "8")
                        .attr("fill", fill);
                var x = 6;
                if (collapseCount > 9) {
                    x = 3;
                }
                if (collapseCount > 99) {
                    x = 1;
                }
                svg.select(".help_text").select("#helptxt_" + sourceId).text(collapseCount)
                        .attr('val', collapseCount)
                        .attr('x', x).attr("y", -5).style("font-size", "9px");
            } else {
                d3.select("#" + sourceId).attr("r", 10);
                svg.select(".help_circle").select("#help_" + sourceId).attr("r", 0);
                svg.select(".help_text").select("#helptxt_" + sourceId).text("");
            }
        }

    }

    function diffArray(arr1, arr2) {
        return arr1.concat(arr2).filter(function (val) {
            if (!(arr1.includes(val) && arr2.includes(val)))
                return val;
        });
    }
});