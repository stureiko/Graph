import testScript from "./scriptTest.js";
import addGraph from "./graph.js";
import lifeExpectancy from "./lifeExpectancy.js";

function main(){
    testScript();
    // addGraph();
    lifeExpectancy();
}


$(document).ready(main);