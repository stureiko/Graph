import {tableFactory, coloredTable} from "./tableFactory.js";


export default async function lifeExpectancy(graphNodes){

    tableFactory(graphNodes);
    coloredTable();
}

