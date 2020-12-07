export default function addGraph(graphNodes){
// Создаем поле для графа
    const svg = d3.select("body")
        .append("svg")
        .attr("id", "main_graph")
        .attr("class", "main_svg_graph")
        .attr("width", 800)
        .attr("height", 600);

    const data = {
        nodes: [
            {name: "Name_1", x: 10, y: 10},
            {name: "Name_2", x: 10, y: 200},
            {name: "Name_3", x: 50, y: 50}
        ],
        links: [
            {source: 0, target: 1},
            {source: 0, target: 2},
            {source: 1, target: 2}
        ]
    };

    const circles = svg.selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle");

    circles
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .attr("r", function () { return 10; })
        .style("fill", function() { return "red"; });

// // Drawing the links
    const lines  =   svg.selectAll("line")
        .data(data.links)
        .enter()
        .append( "line" )
        .style( "stroke", "white" )
        .style( "stroke-width", 2 );

    lines
        .attr("x1", function (d) { return data.nodes[d.source].x; })
        .attr("y1", function (d) { return data.nodes[d.source].y; })
        .attr("x2", function (d) { return data.nodes[d.target].x; })
        .attr("y2", function (d) { return data.nodes[d.target].y; })
        .style( "stroke", "black" )
        .style( "stroke-width", 2 );

    const nodeLabels = svg.selectAll("text")
        .data(data.nodes)
        .enter()
        .append("text");

    nodeLabels
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .text( function (d) { return d.name; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black");
};


