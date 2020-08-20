export default function addGraph(){
// Создаем поле для графа
    d3.select("body")
        .append("svg")
        .attr("id", "main_graph")
        .attr("class", "main_svg_graph")
        .attr("width", 800)
        .attr("height", 600)
};


