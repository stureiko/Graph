import {tableFactory, coloredTable} from "./tableFactory.js";

export default async function lifeExpectancy(){
    const my_data = getJsonData();
    console.log(my_data);
    let graphNodes = [["Id", "Node name", "x", "y", "consumption"]];

    for (let i=0; i < my_data.nodes.length; i++){
        graphNodes.push([my_data.nodes[i].id, my_data.nodes[i].name,
                    my_data.nodes[i].x, my_data.nodes[i].y, my_data.nodes[i].consumption]);
    }

    tableFactory(graphNodes);
    coloredTable();
}

function getJsonData(){
    const jqXHR = $.ajax({
        url: "data/data.json",
        async: false});

    return $.parseJSON(jqXHR.responseText);
}