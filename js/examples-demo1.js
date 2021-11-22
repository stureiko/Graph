document.addEventListener('DOMContentLoaded', () => {
    makeDemo3()
})

function extracted() {
    const width = 800, height = 400

    // Create svg area for plotting
    d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "lightgray")
    return {width, height};
}

function makeDemo2() {

    d3.tsv( "data/examples-multiple.tsv" )
        .then( function( data ) {
            // Plotting area size
            const {width, height} = extracted();

            // Set plotting size same as plotting svg area
            // let pxY = height, pxX = width;                     //<1>
            let scX = d3.scaleLinear()                            //<2>
                .domain( d3.extent(data, d => d["x"] ) )          //<3>
                .range( [0, width] );
            let scY1 = d3.scaleLinear()                           //<4>
                .domain(d3.extent(data, d => d["y1"] ) )
                .range( [height, 0] );                            //<5>
            let scY2 = d3.scaleLinear()
                .domain( d3.extent(data, d => d["y2"] ) )
                .range( [height, 0] );

            d3.select( "svg" )                                    //<6>
                .append( "g" ).attr( "id", "ds1" )                //<7>
                .selectAll( "circle" )                            //<8>
                .data(data).enter().append("circle")
                .attr( "r", 5 ).attr( "fill", "green" )           //<9>
                .attr( "cx", d => scX(d["x"]) )                   //<10>
                .attr( "cy", d => scY1(d["y1"]) );                //<11>

            d3.select( "svg" )                                    //<12>
                .append( "g" ).attr( "id", "ds2" )
                .attr( "fill", "blue" )                           //<13>
                .selectAll( "circle" )                            //<14>
                .data(data).enter().append("circle")
                .attr( "r", 5 )
                .attr( "cx", d => scX(d["x"]) )
                .attr( "cy", d => scY2(d["y2"]) );                //<15>

            let lineMaker = d3.line()                             //<16>
                .x( d => scX( d["x"] ) )                          //<17>
                .y( d => scY1( d["y1"] ) );

            d3.select( "#ds1" )                                   //<18>
                .append( "path" )                                 //<19>
                .attr( "fill", "none" ).attr( "stroke", "red" )
                .attr( "d", lineMaker(data) );                    //<20>

            lineMaker.y( d => scY2( d["y2"] ) );                  //<21>

            d3.select( "#ds2" )                                   //<22>
                .append( "path" )
                .attr( "fill", "none" ).attr( "stroke", "cyan" )
                .attr( "d", lineMaker(data) );

            // d3.select( "#ds2" ).attr( "fill", "red" );            //<23>
        } );
}

function makeDemo3() {
    // Plotting area size
    extracted();

    d3.tsv( "data/examples-multiple.tsv" )
        .then( function( data ) {
            var svg = d3.select( "svg" );                         //<1>

            var pxX = svg.attr( "width" );                        //<2>
            var pxY = svg.attr( "height" );

            var makeScale = function( accessor, range ) {         //<3>
                return d3.scaleLinear()
                    .domain( d3.extent( data, accessor ) )
                    .range( range ).nice();
            }
            var scX  = makeScale( d => d["x"],  [0, pxX] );
            var scY1 = makeScale( d => d["y1"], [pxY, 0] );
            var scY2 = makeScale( d => d["y2"], [pxY, 0] );

            var drawData = function( g, accessor, curve ) {       //<4>
                // draw circles
                g.selectAll( "circle" ).data(data).enter()
                    .append("circle")
                    .attr( "r", 5 )
                    .attr( "cx", d => scX(d["x"]) )
                    .attr( "cy", accessor );

                // draw lines
                var lnMkr = d3.line().curve( curve )              //<5>
                    .x( d=>scX(d["x"]) ).y( accessor );

                g.append( "path" ).attr( "fill", "none" )
                    .attr( "d", lnMkr( data ) );
            }

            var g1 = svg.append( "g" );                           //<6>
            var g2 = svg.append( "g" );

            drawData( g1, d => scY1(d["y1"]), d3.curveStep );     //<7>
            drawData( g2, d => scY2(d["y2"]), d3.curveNatural );

            g1.selectAll( "circle" ).attr( "fill", "green" );     //<8>
            g1.selectAll( "path" ).attr( "stroke", "cyan" );

            g2.selectAll( "circle" ).attr( "fill", "blue" );
            g2.selectAll( "path" ).attr( "stroke", "red" );

            var axMkr = d3.axisRight( scY1 );                     //<9>
            axMkr( svg.append("g") );                             //<10>

            axMkr = d3.axisLeft( scY2 );
            svg.append( "g" )
                .attr( "transform", "translate(" + pxX + ",0)" )  //<11>
                .call( axMkr );                                   //<12>

            svg.append( "g" ).call( d3.axisTop( scX ) )
                .attr( "transform", "translate(0,"+pxY+")" );     //<13>
        } );
}
