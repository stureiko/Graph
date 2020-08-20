import testScript from "./scriptTest.js";
import addGraph from "./graph.js";
import createTable from "./tableFactory.js";
import lifeExpectancy from "./lifeExpectancy.js";

function main(){
    testScript();
    addGraph();
    createTable();
    lifeExpectancy();
}


$(document).ready(main);