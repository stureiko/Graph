// import {tableFactory} from "./tableFactory.js";

export default async function lifeExpectancy(){
    const my_data = getJsonData();
    console.log(my_data);
}

function getJsonData(){
    const jqXHR = $.ajax({
        url: "data/data.json",
        async: false});

    return $.parseJSON(jqXHR.responseText);
}